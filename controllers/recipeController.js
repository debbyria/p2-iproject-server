const axios = require('axios')
const secretKey = process.env.SPOON_KEY

class recipeController {
  static async getParamsRecipe(req, res, next) {
    try {
      let { keyword } = req.query

      let query = `?number=27&apiKey=${secretKey}&excludeIngredients=rat`

      if (keyword) {
        query += `&query=${keyword}`
      }

      let response = await axios.get(`https://api.spoonacular.com/food/videos/search${query}`)

      let dataVideos = response.data.videos

      let results = []

      dataVideos.forEach(element => {
        results.push({
          "title": element.title,
          "views": element.views,
          "thumbnail": element.thumbnail,
          "youtubeUrl": `https://www.youtube.com/watch?v=${element.youTubeId}`
        })
      });

      res.status(200).json({
        "totalPage": Math.ceil(results.length / 9),
        results
      })
    } catch (err) {
      res.status(404).json({
        message: "Data Not Found"
      })
    }
  }
}

module.exports = recipeController