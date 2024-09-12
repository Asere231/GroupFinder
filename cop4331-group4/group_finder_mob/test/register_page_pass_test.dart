import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:http/http.dart' as http;


//  void createJson() {
//     Map map = {
//       'firstName': firstNameController.text,
//       'lastName': lastNameController.text,
//       'username': usernameController.text,
//       'password': passwordController.text,
//       'email': emailController.text
//     };

void main() {

  test('_postData returns 200 status code if request is vaild', () async {

    Map map = {
      'firstName': "Rick",
      'lastName': "Sandchase",
      'username': "RichS",
      'password': "COP4331@",
      'email': "RickS@gmail.com"
    };

    // Replace 'url' with your actual API endpoint
    String url = 'https://cop4331-group4-31270b548dd6.herokuapp.com';

    // Send a POST request to the API endpoint
    final response = await http.post(
      Uri.parse('$url/api/register'),
      headers: <String, String>{
        'Content-Type': 'application/json; charset=UTF-8',
      },
      body: jsonEncode(map),
    );

    // Check if the response status code is 200
    expect(response.statusCode, 200);
  });
}

