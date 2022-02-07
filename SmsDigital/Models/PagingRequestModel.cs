using SmsDigital.Enum;
using SmsDigital.Infrastructure.Enum;
using System;

namespace SmsDigital.Models
{
    public class PagingRequestModel
    {
        public int PageNumber { get; set; } = 0;

        public int PageSize { get; set; } = 10;


        public DateTime? FromDate { get; set; } = null;

        public DateTime? ToDate { get; set; } = null;

        public string OrderBy { get; set; } = "Id";

        public OrderType OrderType { get; set; } = OrderType.Asc;
    }
}
