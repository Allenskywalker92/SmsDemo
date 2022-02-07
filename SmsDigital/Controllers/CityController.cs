using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using SmsDigital.Infrastructure.Entities;
using SmsDigital.Models;
using SmsDigital.Services.Interfaces;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace SmsDigital.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class CityController : ControllerBase
    {
        private readonly ILogger<CityController> _logger;
        private readonly ICityService _cityService;

        public CityController(ILogger<CityController> logger, ICityService cityService)
        {
            _logger = logger;
            _cityService = cityService;
        }

        [HttpGet]
        public async Task<ActionResult<CityResponseModel>> Get([FromQuery]PagingRequestModel requestModel)
        {
            var result = await _cityService.GetCities(requestModel);
            return result;
        }

        [HttpGet]
        [Route("{id}")]
        public async Task<ActionResult<City>> GetById([FromRoute]int id)
        {
            return await _cityService.GetCity(id);
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody]City cityModel)
        {
            await _cityService.CreateCity(cityModel);
            return Ok();
        }

        [HttpPut]
        [Route("{id}")]
        public async Task<IActionResult> Update([FromRoute] int id, [FromBody]City city)
        {
            if (id != city.Id)
                return BadRequest("City ID mismatch");

            var cityToUpdate = await _cityService.GetCity(id);

            if (cityToUpdate == null)
                return NotFound($"City with Id = {id} not found");

            await _cityService.UpdateCity(city);
            return Ok();
        }

        [HttpDelete]
        [Route("{id}")]
        public async Task<IActionResult> Delete([FromRoute]int id)
        {
            var cityToDelete = await _cityService.GetCity(id);

            if (cityToDelete == null)
                return NotFound($"City with Id = {id} not found");

            await _cityService.DeleteCity(id);
            return Ok();
        }
    }
}
