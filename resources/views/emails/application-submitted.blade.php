<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>New Job Application</title>
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
        <h2>
            New Job Application
            @if ($application->jobListing)
                for {{ $application->jobListing->title }}
            @endif
        </h2>
        <p>A new application has been submitted. Here are the details:</p>
        <table class="details-table">
            <tr>
                <th>Full Name</th>
                <td>{{ $application->full_name }}</td>
            </tr>
            <tr>
                <th>Email</th>
                <td>{{ $application->email }}</td>
            </tr>
            <tr>
                <th>Phone</th>
                <td>{{ $application->phone }}</td>
            </tr>
            <tr>
                <th>Expected Pay</th>
                <td>{{ $application->pay }}</td>
            </tr>
            <tr>
                <th>Current Location</th>
                <td>{{ $application->location }}</td>
            </tr>
            <tr>
                <th>Cover Letter</th>
                <td>{{ $application->cover }}</td>
            </tr>
        </table>
        <p>
            <a href="{{ $application->cv }}" download style="display: inline-block; padding: 10px 20px; background-color: #007bff; color: #fff; text-decoration: none; border-radius: 5px;">Download CV</a>
            <a href="{{ $application->letter }}" download style="display: inline-block; padding: 10px 20px; background-color: #007bff; color: #fff; text-decoration: none; border-radius: 5px;">Download Cover Letter</a>
        </p>
    </div>
</body>
</html>
