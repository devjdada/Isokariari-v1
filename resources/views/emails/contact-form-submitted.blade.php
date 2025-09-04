<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>New Contact Form Submission</title>
    <style>
        body {
            font-family: sans-serif;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            border: 1px solid #ccc;
            border-radius: 5px;
        }
        .details-table {
            width: 100%;
            border-collapse: collapse;
        }
        .details-table th, .details-table td {
            padding: 10px;
            border: 1px solid #ddd;
            text-align: left;
        }
        .details-table th {
            background-color: #f2f2f2;
        }
    </style>
</head>
<body>
    <div class="container">
        <h2>New Contact Form Submission: {{ $data['subject'] }}</h2>
        <p>A new message has been submitted through the contact form. Here are the details:</p>
        <table class="details-table">
            <tr>
                <th>Name</th>
                <td>{{ $data['name'] }}</td>
            </tr>
            <tr>
                <th>Email</th>
                <td>{{ $data['email'] }}</td>
            </tr>
            @if ($data['phone'])
                <tr>
                    <th>Phone</th>
                    <td>{{ $data['phone'] }}</td>
                </tr>
            @endif
            <tr>
                <th>Subject</th>
                <td>{{ $data['subject'] }}</td>
            </tr>
            <tr>
                <th>Message</th>
                <td>{{ $data['message'] }}</td>
            </tr>
        </table>
    </div>
</body>
</html>
