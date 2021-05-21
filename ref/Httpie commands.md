**Some httpie commands**

https://httpie.io/docs#http-method

obs: `:4000` shorthand for localhost `http://localhost:4000`

`http -v POST :4000/users email=eg@eg.com email=route@express.com`

`http -v POST :4000/users name="FirstName LastName"` need to put the name inside "" if you plan to put a space in the middle
or

`http -v POST :4000/users name=Nelson" "Mandela email=fre@rika.sa password=kkwen`
