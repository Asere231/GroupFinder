import 'dart:convert';

import 'package:flutter_test/flutter_test.dart';
import 'package:http/http.dart' as http;



void main() {

  test('_postData returns 200 status code if request is vaild', () async {

    Map map = {
      'username' : "RickL",
      'password' : "COP4331@"
    };
     //var jason = jsonEncode(map);

    // Replace 'url' with your actual API endpoint
    String url = 'https://cop4331-group4-31270b548dd6.herokuapp.com';

    // Replace 'json' with your actual JSON data
    // Map<String, dynamic> json = {
    //   // Your JSON data here
    // };

    // Send a POST request to the API endpoint
    final response = await http.post(
      Uri.parse('$url/api/login'),
      headers: <String, String>{
        'Content-Type': 'application/json; charset=UTF-8',
      },
      body: jsonEncode(map),
    );

    // Check if the response status code is 200
    expect(response.statusCode, 200);
  });
}
