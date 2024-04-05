<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Authenticated Page</title>
</head>
<body>
<h1>Welcome, {{ $user->username }} to the Authenticated Page!</h1>
<p>This page can only be accessed by authenticated users.</p>
<p>Here, you can display any content or functionality that is restricted to authenticated users.</p>
 
    <!-- Example: Logout link -->
<form action="{{ route('logout') }}" method="POST">
        @csrf
<button type="submit">Logout</button>
</form>
</body>
</html>