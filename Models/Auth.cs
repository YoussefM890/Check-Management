namespace Check_Management.Models;

public class LoginIn
{
    public string Email { get; set; }
    public string Password { get; set; }
}

public class LoginOut
{
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public string Email { get; set; }
}

public class RegisterIn
{
    public string FirstName { get; set; }

    public string LastName { get; set; }

    // public string UserName { get; set; }
    public string Email { get; set; }
    public string Password { get; set; }
}