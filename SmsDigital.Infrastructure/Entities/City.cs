using Newtonsoft.Json;
using SmsDigital.Enum;
using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace SmsDigital.Infrastructure.Entities
{
    public class City
    {
        public int Id { get; set; }

        [JsonProperty("City")]
        public string Name { get; set; }

        public DateTime StartDate { get; set; }

        public DateTime EndDate { get; set; }

        [Column(TypeName = "decimal(18,4)")]
        public decimal Price { get; set; }

        public StatusEnum Status { get; set; }
        public string Color { get; set; }


        public bool IsDisabled { get; set; }
    }
}
