import 'dart:convert';
import 'dart:developer';
import 'package:flutter_test/flutter_test.dart';
import 'package:group_finder_mob/study-groups.dart';
import 'package:http/http.dart' as http;

  // String url = 'https://cop4331-group4-31270b548dd6.herokuapp.com';


void main() {
  test('_getStudyGroups returns 404 status code', () async {

    String url = 'https://cop4331-group-31270b548dd6.herokuapp.com/';

    final response = await http.get(
      Uri.parse('${url}api/all-tables'),
      headers: <String, String>{
        'Content-Type': 'application/json; charset=UTF-8',
      },
    );


    // Check if the response status code is 404
    expect(response.statusCode, 404);
  });
}

