namespace Check_Management.Models;

public class Check
{
    public int CheckId { get; set; }
    public int? CheckNumber { get; set; }
    public bool IsCashed { get; set; }
    public decimal Amount { get; set; }
    public string? Notes { get; set; }
    public string Recipient { get; set; }
    public DateTime CashDate { get; set; }
    public DateTime? DepositDate { get; set; }
    public DateTime CreatedAt { get; set; }

    public DateTime? UpdatedAt { get; set; }

    //relationship
    public int UserId { get; set; }
    public User User { get; set; }
}

public class CheckIn
{
    public int? CheckId { get; set; }
    public int? CheckNumber { get; set; }
    public int? UserId { get; set; }
    public bool IsCashed { get; set; }
    public decimal Amount { get; set; }
    public string? Notes { get; set; }
    public string Recipient { get; set; }
    public DateTime CashDate { get; set; }
    public DateTime? DepositDate { get; set; }
}
//create a dummy json for checkin