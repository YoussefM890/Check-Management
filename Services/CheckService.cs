using System.Dynamic;
using Check_Management.Models;

namespace Check_Management.Services;

public class CheckService
{
    public static List<Check> GetAllChecks()
    {
        using var db = new ApplicationDbContext();
        return db.Checks.ToList();
    }

    public static Check AddCheck(CheckIn checkIn)
    {
        using var db = new ApplicationDbContext();
        Console.WriteLine(checkIn.CashDate);
        var check = CustomMapper.Map<CheckIn, Check>(checkIn);
        check.CreatedAt = DateTime.Now;
        check.UserId = 4;
        db.Checks.Add(check);
        db.SaveChanges();
        return check;
    }

    //edit check 
    public static Check EditCheck(CheckIn checkIn)
    {
        using var db = new ApplicationDbContext();
        var check = db.Checks.FirstOrDefault(c => c.CheckNumber == checkIn.CheckNumber);
        if (check == null)
        {
            throw new Exception("Check not found");
        }

        CustomMapper.UpdatePropreties(checkIn, check);
        check.UpdatedAt = DateTime.Now;
        if (check.IsCashed && check.DepositDate == null)
        {
            check.DepositDate = check.CashDate;
        }

        db.SaveChanges();
        return check;
    }

    //delete check
    public static void DeleteCheck(int checkNumber)
    {
        using var db = new ApplicationDbContext();
        var check = db.Checks.FirstOrDefault(c => c.CheckNumber == checkNumber);
        if (check == null)
        {
            throw new Exception("Check not found");
        }

        db.Checks.Remove(check);
        db.SaveChanges();
    }

    //patch check deposit date
    public static Object SetCheckDepositDate(int checkNumber)
    {
        using var db = new ApplicationDbContext();
        var check = db.Checks.FirstOrDefault(c => c.CheckNumber == checkNumber);
        if (check == null)
        {
            throw new Exception("Check not found");
        }

        check.DepositDate = DateTime.Now;
        check.UpdatedAt = DateTime.Now;
        db.SaveChanges();
        return new { depositDate = check.DepositDate };
    }

    public static Object SetCheckAsCashed(int checkNumber)
    {
        using var db = new ApplicationDbContext();
        var check = db.Checks.FirstOrDefault(c => c.CheckNumber == checkNumber);
        if (check == null)
        {
            throw new Exception("Check not found");
        }

        check.IsCashed = !check.IsCashed;
        dynamic response = new ExpandoObject();
        response.isCashed = check.IsCashed;
        if (check.IsCashed && check.DepositDate == null)
        {
            check.DepositDate = DateTime.Now;
            response.depositDate = check.DepositDate;
        }

        check.UpdatedAt = DateTime.Now;
        db.SaveChanges();
        return response;
    }
}