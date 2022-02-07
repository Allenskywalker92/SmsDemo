using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Reflection;
using Microsoft.EntityFrameworkCore.Migrations;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;
using SmsDigital.Infrastructure.Entities;
using SmsDigital.Enum;

namespace SmsDigital.Migrations
{
    public partial class Initial : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Cities",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    StartDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    EndDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Price = table.Column<decimal>(type: "decimal(18,4)", nullable: false),
                    Status = table.Column<int>(type: "int", nullable: false),
                    Color = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    IsDisabled = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Cities", x => x.Id);
                });

            List<City> items;
            using (StreamReader r = new StreamReader("data.json"))
            {
                string json = r.ReadToEnd();
                var serializeOptions = new JsonSerializerSettings();
                serializeOptions.Formatting = Formatting.Indented;
                serializeOptions.NullValueHandling = NullValueHandling.Ignore;
                serializeOptions.ContractResolver = new DefaultContractResolver
                {
                    NamingStrategy = new SnakeCaseNamingStrategy()
                };

                items = JsonConvert.DeserializeObject<List<City>>(json, serializeOptions);
            }

            IList<PropertyInfo> props = new List<PropertyInfo>(typeof(City).GetProperties());
            List<object> propertyValues;
            var propertyNames = typeof(City).GetProperties().Select(x => x.Name).ToArray();
            foreach (var item in items)
            {
                propertyValues = new List<object>();
                foreach (PropertyInfo prop in props)
                {
                    if (prop.PropertyType == typeof(StatusEnum))
                    {
                        propertyValues.Add((int)prop.GetValue(item, null));
                    } else
                    {
                        propertyValues.Add(prop.GetValue(item, null));
                    }
                    
                }

                migrationBuilder.InsertData("Cities", propertyNames, propertyValues.ToArray());
            }
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Cities");
        }
    }
}
