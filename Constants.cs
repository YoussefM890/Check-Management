namespace Check_Management;

public class Constants
{
    public static readonly Dictionary<int, (bool Success, string StatusName)> StatusMap =
        new Dictionary<int, (bool, string)>
        {
            // Success 2xx
            { 200, (true, "OK") },
            { 201, (true, "Created") },
            { 204, (true, "No Content") },

            // Client Errors 4xx
            { 400, (false, "Bad Request") },
            { 401, (false, "Unauthorized") },
            { 402, (false, "Payment Required") },
            { 403, (false, "Forbidden") },
            { 404, (false, "Not Found") },
            { 405, (false, "Method Not Allowed") },
            { 406, (false, "Not Acceptable") },
            { 407, (false, "Proxy Authentication Required") },
            { 408, (false, "Request Timeout") },
            { 409, (false, "Conflict") },
            { 410, (false, "Gone") },
            { 411, (false, "Length Required") },
            { 412, (false, "Precondition Failed") },
            { 413, (false, "Payload Too Large") },
            { 414, (false, "URI Too Long") },
            { 415, (false, "Unsupported Media Type") },
            { 416, (false, "Requested Range Not Satisfiable") },
            { 417, (false, "Expectation Failed") },
            { 422, (false, "Unprocessable Entity") },
            { 423, (false, "Locked") },
            { 424, (false, "Failed Dependency") },
            { 426, (false, "Upgrade Required") },
            { 428, (false, "Precondition Required") },
            { 429, (false, "Too Many Requests") },
            { 431, (false, "Request Header Fields Too Large") },
            { 451, (false, "Unavailable For Legal Reasons") },

            // Server Errors 5xx
            { 500, (false, "Internal Server Error") },
            { 501, (false, "Not Implemented") },
            { 502, (false, "Bad Gateway") },
            { 503, (false, "Service Unavailable") },
            { 504, (false, "Gateway Timeout") },
            { 505, (false, "HTTP Version Not Supported") },
            { 506, (false, "Variant Also Negotiates") },
            { 507, (false, "Insufficient Storage") },
            { 508, (false, "Loop Detected") },
            { 510, (false, "Not Extended") },
            { 511, (false, "Network Authentication Required") }
        };
}