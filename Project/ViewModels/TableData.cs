namespace Project.ViewModels
{
  public class TableData<T>
  {
    public int Total
    {
      get; set;
    }

    public List<T> Data
    {
      get; set;
    }
  }
}
