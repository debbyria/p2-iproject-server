const { Op } = require("sequelize");
let { Restaurant } = require("../models/index")
const axios = require('axios')
const key = process.env.AUTH_KEY_4SQUARE

class restaurantController {
  static async getAllRestaurants(req, res, next) {
    try {
      let { page, keyword, category } = req.query

      let query = {}

      query.limit = 9
      query.offset = 0

      if (page) {
        query.limit = 9
        query.offset = (page - 1) * 9
      }

      if (keyword) {
        query.where = {
          ...query.where,
          name: {
            [Op.iLike]: `%${keyword}%`
          }
        }
      }

      if (category) {
        query.where = {
          ...query.where = {
            CategoryId: +category
          }
        }
      }

      let output = await Restaurant.findAll(query)
      let totalRecords = await Restaurant.findAndCountAll()
      let totalItems = await Restaurant.findAndCountAll(query)
      let totalPages = Math.ceil(totalItems.count / 9)
      let currentPage = page || 1

      let result = {
        "totalRecords": totalRecords.count,
        "totalItems": totalItems.count,
        "data": output,
        "totalPages": totalPages,
        "currentPage": currentPage
      }
      res.status(200).json(result)
    } catch (err) {
      next(err)
    }
  }

  static async allRestaurants(req, res, next) {
    try {

      let { location } = req.query
      let query = "?categories=13000&limit=20"

      if (location) {
        query += `&near=${location}`
      } else {
        query += `&near=Jakarta`
      }

      let response = await axios.get(`https://api.foursquare.com/v3/places/search${query}`, {
        headers: {
          "Accept": "application/json",
          "Authorization": key
        }
      })

      let data = response.data.results
      let results = []

      data.forEach(element => {
        results.push({
          "fsq_id": element.fsq_id,
          "location": element.location.formatted_address,
          "name": element.name,
          "latitude": element.geocodes.main.latitude,
          "longitude": element.geocodes.main.longitude
        })
      });
      for (let i = 0; i < results.length; i++) {
        let res = await axios.get(`https://api.foursquare.com/v3/places/${results[i].fsq_id}/photos`, {
          headers: {
            "Accept": "application/json",
            "Authorization": key
          }
        })

        results[i].imageUrl = `${res.data[0].prefix}original${res.data[0].suffix}`
      }

      res.status(200).json({
        totalPage: Math.ceil(results.length / 9),
        results
      })
    } catch (err) {
      next(err)
    }
  }

  static async getRestaurantDetail(req, res, next) {
    try {
      let { fsqId } = req.params
      let response = await axios.get(`https://api.foursquare.com/v3/places/${fsqId}`, {
        headers: {
          "Accept": "application/json",
          "Authorization": key
        }
      })

      let responsePhoto = await axios.get(`https://api.foursquare.com/v3/places/${fsqId}/photos`, {
        headers: {
          "Accept": "application/json",
          "Authorization": key
        }
      })

      let photo = `${responsePhoto.data[0].prefix}original${responsePhoto.data[0].suffix}`

      let data = {
        imageUrl: photo,
        name: response.data.name,
        address: response.data.location.address,
        locationMap: `https://maps.google.com/maps?q=${response.data.geocodes.main.latitude},${response.data.geocodes.main.longitude}&output=embed`
      }

      res.status(200).json(data)
    } catch (err) {
      next(err)
    }
  }
}

module.exports = restaurantController