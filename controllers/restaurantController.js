const { Op } = require("sequelize");
let { Restaurant } = require("../models/index")
// const sdk = require('api')('@fsq-docs/v1.0#14d4602hl16yojbt');
const axios = require('axios')


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
      console.log(err)
      next(err)
    }
  }

  static async allRestaurants(req, res, next) {
    try {
      let key = process.env.AUTH_KEY_4SQUARE

      let response = await axios.get('https://api.foursquare.com/v3/places/search?categories=13000&near=Jakarta&limit=10', {
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

      res.status(200).json(results)
    } catch (err) {
      res.status(401).json({
        message: "We got an error here"
      })
    }
  }
}

module.exports = restaurantController