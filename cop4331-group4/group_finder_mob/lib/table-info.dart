import 'dart:convert';
import 'dart:developer';
import 'package:group_finder_mob/storage.dart';
import 'package:flutter/material.dart';
import 'package:http/http.dart';
import 'table_update.dart';
import 'url.dart';
import 'home_page.dart';

class TableInfo extends StatefulWidget {
  dynamic tableJson;
  TableInfo({super.key, required this.tableJson});

  @override
  State<TableInfo> createState() => _TableInfoState();
}

class _TableInfoState extends State<TableInfo> {
  final dataStorage = Storage();
  bool showLeaveButton = false;
  bool showUpdateButton = false;

  @override
  void initState() {
    // TODO: implement initState
    super.initState();
    _updateButton(widget.tableJson);
  }

  @override
  Widget build(BuildContext context) {
    return Container(
      decoration: const BoxDecoration(
        image: DecorationImage(
          image: AssetImage('images/BackgroundUCF.webp'),
          fit: BoxFit.cover,
        ),
      ),
      child: Scaffold(
        appBar: AppBar(
          iconTheme: const IconThemeData(color: Colors.white),
          backgroundColor: Colors.black.withOpacity(0.7),
          toolbarHeight: 35.0,
          leading: IconButton(
            icon: const Icon(Icons.arrow_back),
            onPressed: () {
              Navigator.pushReplacement(
                context,
                MaterialPageRoute(builder: (context) => HomePage()),
              );
            },
          ),
        ),
        backgroundColor: Colors.transparent,
        body: Container(
            // Account Page Container
            padding: EdgeInsets.all(16.0),
            decoration: BoxDecoration(
              color: Colors.black.withOpacity(0.7), //Color(0xFFF9F5B6),
              //borderRadius: BorderRadius.circular(20),
            ),
            child: _page()),
      ),
    );
  }

  void _updateButton(dynamic newTable) async {
    String? userId = await dataStorage.getUserId();
    log("update button");
    bool _showLeaveButton = await shouldShowLeaveButton(newTable);
    bool _showUpdateButton = await shouldShowUpdateButton(newTable);
    //log(_showLeaveButton.toString());
    setState(() {
      widget.tableJson = newTable;
      showLeaveButton = _showLeaveButton;
      showUpdateButton = _showUpdateButton;
    });
  }

  Future<bool> shouldShowLeaveButton(dynamic newTable) async {
    String? userId = await dataStorage.getUserId();
    log("here");
    List<dynamic> users = newTable['usersAtTable'];
    bool isAtTable = false;
    for (var i = 0; i < users.length; i++) {
      log(users[i]);
      if (users[i] == userId) {
        isAtTable = true;
        return isAtTable;
      }
    }
    return isAtTable;
  }

  Future<bool> shouldShowUpdateButton(dynamic newTable) async {
    String? userId = await dataStorage.getUserId();
    List<dynamic> users = newTable['usersAtTable'];
    bool isAtTable = false;
    if (users[0] == userId) {
      isAtTable = true;
    }
    return isAtTable;
  }

  Widget _page() {
    return FutureBuilder<bool>(
      future: shouldShowLeaveButton(widget.tableJson),
      builder: (context, snapshot) {
        if (snapshot.connectionState == ConnectionState.waiting) {
          return CircularProgressIndicator(); // Display loading indicator while waiting for the result
        }
        if (snapshot.hasError) {
          log('error: ${snapshot.error}');
          return Text('Error: ${snapshot.error}');
        }
        // Default to false if data is null

        return Padding(
          padding: const EdgeInsets.all(32.0),
          child: Center(
            child: SingleChildScrollView(
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  const SizedBox(height: 30),
                  _pageNameText(),
                  const SizedBox(height: 5),
                  const SizedBox(height: 15),
                  _tableText('Table Number'),
                  const SizedBox(height: 25),
                  _tableText('Title'),
                  const SizedBox(height: 25),
                  _tableText('Subject'),
                  const SizedBox(height: 25),
                  _tableText('Current Capacity'),
                  const SizedBox(height: 25),
                  _tableText('Max Capacity'),
                  const SizedBox(height: 25),
                  if (showUpdateButton) _editButton(),
                  if (showLeaveButton)
                    _leaveButton()
                  else
                    _joinButton(), // Display error message widget when showJoinButton is false
                ],
              ),
            ),
          ),
        );
      },
    );
  }

  Widget _errorMsg() {
    return Text(
      "Username already exists or\ninvalid email",
      textAlign: TextAlign.center,
      style: TextStyle(
        color: Colors.red[900],
        fontSize: 18.0,
        fontWeight: FontWeight.bold,
        shadows: [
          Shadow(
            color: Colors.black.withOpacity(0.5), // Subtle black shadow
            offset: const Offset(1, 1), // Shadow offset
            blurRadius: 1, // Shadow blur radius
          ),
        ],
      ),
    );
  }

  Widget _tableText(String boxTitle) {
    final String boxText;

    switch (boxTitle) {
      case 'Table Number':
        boxText = widget.tableJson['tableNum'].toString();
        break;
      case 'Title':
        boxText = widget.tableJson['title'].toString();
        break;
      case 'Subject':
        boxText = widget.tableJson['subject'].toString();
        break;
      case 'Max Capacity':
        boxText = widget.tableJson['maxCapacity'].toString();
        break;
      case 'Current Capacity':
        boxText = widget.tableJson['currCapacity'].toString();
        break;
      default:
        boxText = '';
    }

    return RichText(
        text: TextSpan(
            text: '$boxTitle: ',
            style: const TextStyle(
                color: Colors.white, fontWeight: FontWeight.bold, fontSize: 18),
            children: <TextSpan>[
          TextSpan(
            text: boxText,
            style: const TextStyle(
              color: Colors.white,
            ),
          )
        ]));
  }

  Widget _joinButton() {
    return ElevatedButton(
      onPressed: () {
        _addToTable();
      },
      child: const SizedBox(
        child: Text("Join Table"),
      ),
    );
  }

  Widget _leaveButton() {
    return ElevatedButton(
      onPressed: () {
        _leaveTable();
      },
      child: const SizedBox(
        child: Text("Leave Table"),
      ),
    );
  }

  Widget _editButton() {
    return ElevatedButton(
      onPressed: () {
        Navigator.push(
          context,
          MaterialPageRoute(
              builder: (context) => TableUpdate(
                    tableJson: widget.tableJson,
                  )),
        );
      },
      child: const SizedBox(
        child: Text("Update Table"),
      ),
    );
  }

  Widget _pageNameText() {
    return const Text(
      "Table Information",
      textAlign: TextAlign.center,
      style: TextStyle(fontSize: 32, color: Colors.white),
    );
  }

  Future<void> _addToTable() async {
    String? userId = await dataStorage.getUserId();
    String tableNum = widget.tableJson['tableNum'];
    int oldCapacityInt = widget.tableJson['currCapacity'];
    int newCapacity = oldCapacityInt + 1;

    if (userId != null) {
      log("Current UserID: $userId");
      Map map = {'tableNum': tableNum, 'currCapacity': newCapacity};

      String jason = jsonEncode(map);
      final token = await dataStorage.getToken();
      if (token != null) {
        try {
          final response = await patch(
            Uri.parse('${url}api/add-user-to-table'),
            headers: <String, String>{
              'Content-Type': 'application/json; charset=UTF-8',
              'Authorization': token,
            },
            body: jason,
          );
          log('${response.statusCode}');
          if (response.statusCode == 200) {
            log("good response");
            // Decodes JWT made token
            final responseData = jsonDecode(response.body);
            log(response.body);

            //widget.tableJson = responseData;
            _updateButton(responseData);
            // Redirect to home page
            /*
        Navigator.push(
          context,
          MaterialPageRoute(builder: (context) => ValidationPage()),
        );
        */
          } else {
            log(jsonDecode(response.body)['error']);
          }
        } catch (e) {
          log('Error: $e');
        }
      }
    } else {
      return;
    }
  }

  Future<void> _leaveTable() async {
    String tableNum = widget.tableJson['tableNum'];
    int oldCapacityInt = widget.tableJson['currCapacity'];
    int newCapacity = oldCapacityInt - 1;

    Map map = {'tableNum': tableNum, 'currCapacity': newCapacity};
    String jason = jsonEncode(map);
    final token = await dataStorage.getToken();
    if (token != null) {
      try {
        final response = await patch(
          Uri.parse('${url}api/remove-user-from-table'),
          headers: <String, String>{
            'Content-Type': 'application/json; charset=UTF-8',
            'Authorization': token,
          },
          body: jason,
        );
        log('${response.statusCode}');
        if (response.statusCode == 200) {
          log("good response");
          // Decodes JWT made token
          final responseData = jsonDecode(response.body);
          log(response.body);
          dataStorage.storeCurTable('0');
          //widget.tableJson = responseData;
          checkForEmpty(response.body);
          // Redirect to home page
          /*
        Navigator.push(
          context,
          MaterialPageRoute(builder: (context) => ValidationPage()),
        );
        */
        } else {
          log(jsonDecode(response.body)['error']);
        }
      } catch (e) {
        log('Error: $e');
      }
    }
  }

  void checkForEmpty(String tableNumJson) {
    final tableInfo = jsonDecode(tableNumJson);
    if (tableInfo['currCapacity'] == 0) {
      log("table empty");
      deleteTable(tableNumJson);
    } else {
      log("table not empty");
      _updateButton(tableInfo);
    }
  }

  Future<void> deleteTable(String tableNumJson) async {
    try {
      final response = await delete(Uri.parse('${url}api/delete-table'),
          headers: <String, String>{
            'Content-Type': 'application/json; charset=UTF-8',
          },
          body: tableNumJson);
      log('${response.statusCode}');
      if (response.statusCode == 200) {
        log("good response");

        final responseData = jsonDecode(response.body);
        log(responseData['message']);

        Navigator.push(
          context,
          MaterialPageRoute(builder: (context) => HomePage()),
        );
      } else {
        log(jsonDecode(response.body)['error']);
      }
    } catch (e) {
      log('Error: $e');
    }
  }
}
