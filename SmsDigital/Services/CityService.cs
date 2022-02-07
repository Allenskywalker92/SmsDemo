using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;
using SmsDigital.Infrastructure.Contexts;
using SmsDigital.Infrastructure.Entities;
using SmsDigital.Models;
using SmsDigital.Services.Interfaces;
using SmsDigital.Infrastructure.Enum;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace SmsDigital.Services
{
    public class CityService : ICityService
    {
        private readonly AppDbContext _context;
        private readonly IMapper _mapper;
        public CityService(AppDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }
        public async Task<CityResponseModel> GetCities(PagingRequestModel requestModel)
        {

            IQueryable<City> query = _context.Cities;
            if (requestModel.FromDate.HasValue)
            {
                query = query.Where(x => x.StartDate >= requestModel.FromDate.Value);
            }

            if (requestModel.ToDate.HasValue)
            {
                query = query.Where(x => x.EndDate <= requestModel.ToDate.Value);
            }

            switch (requestModel.OrderBy)
            {
                case "Id" when requestModel.OrderType == OrderType.Asc:
                    query = query.OrderBy(x => x.Id);
                    break;
                case "Id" when requestModel.OrderType == OrderType.Desc:
                    query = query.OrderByDescending(x => x.Id);
                    break;
                case "Name" when requestModel.OrderType == OrderType.Asc:
                    query = query.OrderBy(x => x.Name);
                    break;
                case "Name" when requestModel.OrderType == OrderType.Desc:
                    query = query.OrderByDescending(x => x.Name);
                    break;
                case "Price" when requestModel.OrderType == OrderType.Asc:
                    query = query.OrderBy(x => x.Price);
                    break;
                case "Price" when requestModel.OrderType == OrderType.Desc:
                    query = query.OrderByDescending(x => x.Price);
                    break;
                case "StartDate" when requestModel.OrderType == OrderType.Asc:
                    query = query.OrderBy(x => x.StartDate);
                    break;
                case "StartDate" when requestModel.OrderType == OrderType.Desc:
                    query = query.OrderByDescending(x => x.StartDate);
                    break;
                case "EndDate" when requestModel.OrderType == OrderType.Asc:
                    query = query.OrderBy(x => x.EndDate);
                    break;
                case "EndDate" when requestModel.OrderType == OrderType.Desc:
                    query = query.OrderByDescending(x => x.EndDate);
                    break;
                case "Color" when requestModel.OrderType == OrderType.Asc:
                    query = query.OrderBy(x => x.Color);
                    break;
                case "Color" when requestModel.OrderType == OrderType.Desc:
                    query = query.OrderByDescending(x => x.Color);
                    break;
                case "Status" when requestModel.OrderType == OrderType.Asc:
                    query = query.OrderBy(x => x.Status);
                    break;
                case "Status" when requestModel.OrderType == OrderType.Desc:
                    query = query.OrderByDescending(x => x.Status);
                    break;
                default:
                    break;
            }

            CityResponseModel responseModel = new CityResponseModel();

            responseModel.Data = await query.Skip(requestModel.PageNumber * requestModel.PageSize)
                .Take(requestModel.PageSize)
                .ToListAsync();
            var count = await query.CountAsync();
            responseModel.TotalPage = count / requestModel.PageSize + 1;
            return responseModel;
        }

        public async Task<City> GetCity(int id)
        {
            var city = await _context.Cities.SingleOrDefaultAsync(x => x.Id == id);
            return city;
        }

        public async Task<bool> CreateCity(City city)
        {
            await _context.Cities.AddAsync(city);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> DeleteCity(int id)
        {
            var city = await _context.Cities.SingleOrDefaultAsync(x => x.Id == id);
            city.IsDisabled = true;
            return await _context.SaveChangesAsync() > 0;
        }


        public async Task<bool> UpdateCity(City city)
        {
            var entity = await _context.Cities.SingleOrDefaultAsync(x => x.Id == city.Id);
            entity.Name = city.Name;
            entity.Price = city.Price;
            entity.StartDate = city.StartDate;
            entity.EndDate = city.EndDate;
            entity.Status = city.Status;
            entity.Color = city.Color;
            await _context.SaveChangesAsync();
            return true;
        }
    }
}
