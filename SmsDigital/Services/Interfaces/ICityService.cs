using SmsDigital.Infrastructure.Entities;
using SmsDigital.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace SmsDigital.Services.Interfaces
{
    public interface ICityService
    {
        public Task<CityResponseModel> GetCities(PagingRequestModel requestModel);

        public Task<City> GetCity(int id);

        public Task<bool> CreateCity(City city);

        public Task<bool> UpdateCity(City city);

        public Task<bool> DeleteCity(int id);

    }
}
