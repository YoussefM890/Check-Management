public class UserNotFoundException : Exception
{
    public UserNotFoundException(string message) : base(message)
    {
    }
}

public class UserDoesNotHaveAccessException : Exception
{
    public UserDoesNotHaveAccessException(string message) : base(message)
    {
    }
}