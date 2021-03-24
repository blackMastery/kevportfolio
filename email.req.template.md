curl --request POST \
--url https://api.sendgrid.com/v3/mail/send \
--header 'Authorization: Bearer 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' \
--header 'Content-Type: application/json' \
--data '{"personalizations":[{"to":[{"email":"kev.cadogan300@gmail.com","name":"John Doe"}],"subject":"Hello, World!"}],"content": [{"type": "text/plain", "value": "Heya!"}],"from":{"email":"black.king1232@gmail.com","name":"kev kev test"},"reply_to":{"email":"black.king1232@gmail.com"}}'





$.ajax({
  // The 'type' property sets the HTTP method
  // Any value other than GET, POST, HEAD (eg. PUT or DELETE methods) will initiate a preflight request
  type: 'GET',

  // The Target Domain URL to make the request to
  url: 'http://targetdomain.com',

  // The 'contentType' property sets the 'Content-Type' header
  // The JQuery default for this property is
  // 'application/x-www-form-urlencoded; charset=UTF-8'
  // If you set this value to anything other than
  // application/x-www-form-urlencoded, multipart/form-data, or text/plain,
  // you will trigger a preflight request
  contentType: 'text/plain',

    xhrFields: {
      // The 'xhrFields' property sets additional fields on the XMLHttpRequest
      // This can be used to set the 'withCredentials' property
      // Set the value to 'true' to pass cookies to the server
      // If this is enabled, your server must respond with the header
      // 'Access-Control-Allow-Credentials: true'
      // Remember that IE <= 9 does not support the 'withCredentials' property
      withCredentials: false
    },

    headers: {
      // Set custom headers
      // If you set any non-simple headers, your server response must include
      // the headers in the 'Access-Control-Allow-Headers' response header
    },

    success: function() {
      // Handler for a successful response, do something with the response.Text
    },

    error: function() {
      // Error handler
      // Note that if the error was due to an issue with CORS,
      // this function will still be triggered, but there won't be any additional information about the error.
    }
});