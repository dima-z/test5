using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Project.DAL;
using System.Net;
using System.Text.Json;

namespace Project.Controllers
{
  [ApiController]
  [Route("[controller]")]
  public class DataController : ControllerBase
  {
    private readonly ILogger<DataController> _logger;
    private const int _recordsPerPage = 10;

    public DataController(ILogger<DataController> logger)
    {
      _logger = logger;
    }

    [HttpPost]
    public List<KeyValue>? Post([FromBody] List<object> rows)
    {
      var deserialized = new List<Dictionary<string, string>>();
      try
      {
        rows.ForEach(r =>
        {
          deserialized.Add(JsonSerializer
            .Deserialize<Dictionary<string, string>>(r.ToString()));
        });
      }
      catch (Exception)
      {
        Response.StatusCode = (int) HttpStatusCode.BadRequest;
        return null;
      }

      var values = new List<KeyValue>();
      foreach (var d in deserialized)
      {
        if (d.Count == 1 && int.TryParse(d.First().Key, out var key))
        {
          values.Add(new KeyValue() { Code = key, Value = d.First().Value });
        }
        else
        {
          Response.StatusCode = (int) HttpStatusCode.BadRequest;
          return null;
        }
      }

      using var db = new AppDbContext();
      db.Database.ExecuteSqlRaw("TRUNCATE TABLE [Values];");
      db.AddRange(values.OrderBy(i => i.Code));
      db.SaveChanges();

      return values;
    }

    [HttpGet]
    public ViewModels.TableData<KeyValue> Get(int? page, string? filter)
    {
      using var db = new AppDbContext();
      var dataFiltered = db.Values.AsQueryable();
      if (!string.IsNullOrEmpty(filter))
      {
        dataFiltered = dataFiltered.Where(i => i.Code.ToString().Contains(filter) || i.Value.Contains(filter));
      }

      var totalRecords = dataFiltered.Count();

      var actualData = dataFiltered
        .Skip(((page ?? 1) - 1) * _recordsPerPage)
        .Take(_recordsPerPage);

      return new ViewModels.TableData<KeyValue>()
      {
        Total = totalRecords,
        Data = actualData.ToList()
      };
    }
  }
}
