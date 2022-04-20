const axios = require('axios')
const secretKey = process.env.SPOON_KEY

class recipeController {
  static async getParamsRecipe(req, res, next) {
    try {
      let { query } = req.query

      let response = await axios.get(`https://api.spoonacular.com/food/videos/search?query=${query}&number=6&apiKey=${secretKey}`)

      let dataVideos = response.data.videos

      let result = []

      dataVideos.forEach(element => {
        result.push({
          "title": element.title,
          "views": element.views,
          "thumbnail": element.thumbnail,
          "youtubeUrl": `https://www.youtube.com/watch?v=${element.youTubeId}`
        })
      });

      res.status(200).json(result)
    } catch (err) {
      res.status(404).json({
        message: "Data Not Found"
      })
    }
  }
}

module.exports = recipeController