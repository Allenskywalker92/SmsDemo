using SmsDigital.Infrastructure.Entities;
using System.Collections.Generic;

namespace SmsDigital.Models
{
    public class CityResponseModel : AbstractPagingModel
    {
        public List<City> Data { get; set; }
    }
}
