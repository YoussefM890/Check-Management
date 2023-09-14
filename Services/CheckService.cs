using System.Dynamic;
using Check_Management.Models;

namespace Check_Management.Services;

public class CheckService
{
    public static List<Check> GetChecksByUserId(int userId)
    {
        using var db = new ApplicationDbContext();
        return db.Checks.Where(c => c.UserId == userId).ToList();
    }

    public static Check AddCheck(CheckIn checkIn, int userId)
    {
        using var db = new ApplicationDbContext();
        var check = CustomMapper.Map<CheckIn, Check>(checkIn);
        check.CreatedAt = DateTime.Now;
        check.UserId = userId;
        db.Checks.Add(check);
        db.SaveChanges();
        return check;
    }

    //edit check 
    public static Check EditCheck(CheckIn checkIn)
    {
        using var db = new ApplicationDbContext();
        var check = db.Checks.FirstOrDefault(c => c.CheckId == checkIn.CheckId);
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
    public static void DeleteCheck(int checkId)
    {
        using var db = new ApplicationDbContext();
        var check = db.Checks.FirstOrDefault(c => c.CheckId == checkId);
        if (check == null)
        {
            throw new Exception("Check not found");
        }

        db.Checks.Remove(check);
        db.SaveChanges();
    }

    //patch check deposit date
    public static Object SetCheckDepositDate(int checkId)
    {
        using var db = new ApplicationDbContext();
        var check = db.Checks.FirstOrDefault(c => c.CheckId == checkId);
        if (check == null)
        {
            throw new Exception("Check not found");
        }

        check.DepositDate = DateTime.Now;
        check.UpdatedAt = DateTime.Now;
        db.SaveChanges();
        return new { depositDate = check.DepositDate };
    }

    public static Object SetCheckAsCashed(int checkId)
    {
        using var db = new ApplicationDbContext();
        var check = db.Checks.FirstOrDefault(c => c.CheckId == checkId);
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

    //check belongs to user
    public static bool CheckBelongsToUser(int checkId, int userId)
    {
        using var db = new ApplicationDbContext();
        var check = db.Checks.FirstOrDefault(c => c.CheckId == checkId);
        if (check == null)
        {
            throw new Exception("Check not found");
        }

        return check.UserId == userId;
    }
}