<?php
// REPLACE WITH YOUR EMAIL ADDRESS
$to = "info@anantagrawalarchitects.com"; 

if(isset($_POST['submit'])){
    $firstname = $_POST['firstname'];
    $lastname = $_POST['lastname'];
    $email = $_POST['email'];
    $project = $_POST['project_type'];
    $message = $_POST['message'];

    $subject = "New Portfolio Inquiry from: " . $firstname . " " . $lastname;
    
    $body = "You have received a new message from your website contact form.\n\n"."Here are the details:\n\nName: $firstname $lastname\n\nEmail: $email\n\nProject Type: $project\n\nMessage:\n$message";

    $headers = "From: noreply@anantaggarwal.com\n"; // Use a domain email if possible
    $headers .= "Reply-To: $email";

    if(mail($to, $subject, $body, $headers)){
        // Success: Redirect back to contact page with success message
        echo "<script>alert('Message sent successfully. We will be in touch shortly.'); window.location.href='contact.html';</script>";
    } else {
        // Error
        echo "<script>alert('Message sending failed. Please try again.'); window.history.back();</script>";
    }
}
?>