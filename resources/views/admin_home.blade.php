<!DOCTYPE html>
<html>
    <head>
        <style>
            #users {
            font-family: Arial, Helvetica, sans-serif;
            border-collapse: collapse;
            width: 100%;
            }

            #users td, #users th {
            border: 1px solid #ddd;
            padding: 8px;
            }

            #users tr:nth-child(even){background-color: #f2f2f2;}

            #users tr:hover {background-color: #ddd;}

            #users th, #users th a {
            padding-top: 12px;
            padding-bottom: 12px;
            text-align: left;
            background-color: #04AA6D;
            color: white;
            }
        </style>
    </head>
    <body >
        <h1>Admin Home</h1>
        <table id="users">
            <thead>
                <tr>
                    <th> <a href="/reseller/atributes">Manage Resellers ( By Custom Attributes )</a> </th>
                    <th> <a href="/reseller/groups">Manage Resellers ( By Groups )</a> </th>
                    <th> <a href="/client/atributes">Clients ( By Custom Attributes )</a> </th>
                    <th> <a href="/client/groups">Clients ( By Groups )</a> </th>
                </tr>
            </thead>
        </table>
    </body>
    <br>
    <a href="http://localhost:8080/realms/master/protocol/openid-connect/logout">Logout<a>
</html>