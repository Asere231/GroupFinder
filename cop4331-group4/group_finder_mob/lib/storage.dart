import 'dart:developer';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';
import 'package:jwt_decoder/jwt_decoder.dart';

class Storage {
  final FlutterSecureStorage _storage = FlutterSecureStorage();

  //store token and extract data
  Future<void> storeToken(String token) async {
    await _storage.write(key: 'jwt', value: token);
    log("Token stored");
    await storeClaims();
  }

  Future<void> storeClaims() async {
    final token = await _storage.read(key: 'jwt');

    if(token != null) {
      final Map<String, dynamic> claims = JwtDecoder.decode(token);
      _storage.write(key: 'userId', value: claims['userId']);
      _storage.write(key: 'firstName', value: claims['firstName']);
      _storage.write(key: 'lastName', value: claims['lastName']);
      _storage.write(key: 'verificationCode', value: claims['verificationCode']);
      _storage.write(key: 'username', value: claims['username']);
    }
    else {
      log("Null token");
    }
    log("Claims stored");
  }

  Future<void> storeUserUpdates(Map updatedUser) async {
    _storage.write(key: 'firstName', value: updatedUser['firstName']);
    _storage.write(key: 'lastName', value: updatedUser['lastName']);
  }

  Future<void> storePassword(String password) async {
    await _storage.write(key: 'password', value: password);
    log('Stored password');
  }

  Future<String?> getVerificationCode() async {
    String? code = await _storage.read(key: 'verificationCode');
    if(code == null) {
      log("Did not find verificationCode from token");
    }
    return code;
  }

  Future<String?> getToken() async {
    String? token = await _storage.read(key: 'jwt');
    if(token == null) {
      log("Did not find token");
    }
    return token;
  }

  Future<String?> getUserId() async {
    String? userId = await _storage.read(key: 'userId');
    if(userId == null) {
      log("No user ID found");
    }
    return userId;
  }

  Future<String?> getFirstName() async {
    String? firstName = await _storage.read(key: 'firstName');
    if(firstName == null) {
      log("No first name found");
    }
    return firstName;
  }

  Future<String?> getLastName() async {
    String? lastName = await _storage.read(key: 'lastName');
    if(lastName == null) {
      log("No first name found");
    }
    return lastName;
  }

  Future<String?> getUsername() async {
    String? username = await _storage.read(key: 'username');
    if(username == null) {
      log("No first name found");
    }
    return username;
  }

  Future<String?> getPassword() async {
    String? password = await _storage.read(key: 'password');
    if(password == null) {
      log("No password found");
    }
    return password;
  }


  Future<void> storeCurTable(String curTable) async {
    await _storage.write(key: 'curTable', value: curTable);
    log("Current table stored");
  }

  Future<int?> getCurTable() async {
    final curTable = (await _storage.read(key: 'curTable'));
    if(curTable != null) {
      int? tableNum = int.tryParse(curTable);
      log("$tableNum");
      return tableNum;
    }
    
    if(curTable == null) {
      log("User not currently at table");
      return 0;
    }
  }

  Future<void> logout() async {
    _storage.deleteAll();
    log("storage deleted");
  }
}