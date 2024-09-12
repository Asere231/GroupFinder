import 'dart:convert';
import 'dart:ui';
import 'package:group_finder_mob/empty-table.dart';
import 'package:http/http.dart';

import 'table-info.dart';
import 'url.dart';
import 'dart:developer';

import 'package:flutter/material.dart';

class FirstFloorMap extends StatefulWidget {
  const FirstFloorMap({super.key});

  @override
  State<FirstFloorMap> createState() => _FirstFloorMapState();
}

class _FirstFloorMapState extends State<FirstFloorMap> {
  Map<String, Map<String, dynamic>?> tables = {
    '101': null,
    '102': null,
    '103': null,
    '104': null,
    '105': null,
    '106': null,
    '107': null,
    '108': null,
    '109': null,
    '110': null,
    '111': null,
    '112': null,
    '113': null,
    '114': null,
    '115': null,
    '116': null,
    '117': null,
    '118': null,
    '119': null,
    '120': null,
    '121': null,
    '122': null,
    '123': null,
    '124': null,
    '125': null,
    '126': null,
  };

  late Future<void> _tablesFuture;

  @override
  void initState() {
    // TODO: implement initState
    super.initState();
    _tablesFuture = getAllTablesOnFloor();
  }

  @override
  Widget build(BuildContext context) {
    return FutureBuilder(
      future: _tablesFuture,
      builder: (context, snapshot) {
        if (snapshot.connectionState == ConnectionState.waiting) {
          return const SizedBox.shrink();
        } else if (snapshot.hasError) {
          return Text('Error: ${snapshot.error}');
        } else {
          return Stack(
            children: [
              Container(
                decoration: BoxDecoration(
                  border: Border.all(
                    color: Colors.black,
                    width: 2.0,
                  ),
                ),
                child: Image.asset(
                  'images/FirstFloorMap.jpg',
                  width: 465,
                  height: 500,
                  fit: BoxFit.fitWidth,
                ),
              ),
              Positioned(
                  // Table 101
                  bottom: 368.0,
                  right: 227.0,
                  child: _buildTableContainer('101', 17, 9)),
              Positioned(
                  // Table 102
                  bottom: 352.0,
                  right: 212.0,
                  child: _buildTableContainer('102', 9, 17)),
              Positioned(
                  // Table 103
                  bottom: 345,
                  right: 187,
                  child: _buildTableContainer('103', 13.5, 30)),
              Positioned(
                  // Table 104
                  bottom: 347.0,
                  right: 227.0,
                  child: _buildTableContainer('104', 17, 9)),
              Positioned(
                  // Table 105
                  bottom: 322.0,
                  right: 227.0,
                  child: GestureDetector(
                      onTap: () {
                        log("105");
                      },
                      child: _buildTableContainer('105', 17, 16))),
              Positioned(
                  // Table 106
                  bottom: 318.5,
                  right: 198.0,
                  child: GestureDetector(
                      onTap: () {
                        log("106");
                      },
                      child: _buildTableContainer('106', 17, 9))),
              Positioned(
                  // Table 107
                  bottom: 297.8,
                  right: 198.0,
                  child: GestureDetector(
                      onTap: () {
                        log("107");
                      },
                      child: _buildTableContainer('107', 17, 9))),
              Positioned(
                  // Table 108
                  bottom: 260.8,
                  right: 223.0,
                  child: GestureDetector(
                      onTap: () {
                        log("108");
                      },
                      child: _buildTableContainer('108', 17, 16))),
              Positioned(
                  // Table 109
                  bottom: 271.8,
                  right: 198.0,
                  child: GestureDetector(
                      onTap: () {
                        log("109");
                      },
                      child: _buildTableContainer('109', 17, 9))),
              Positioned(
                  // Table 110
                  bottom: 270.6,
                  right: 160.0,
                  child: GestureDetector(
                      onTap: () {
                        log("110");
                      },
                      child: _buildTableContainer('110', 14, 27))),
              Positioned(
                  // Table 111
                  bottom: 290.6,
                  right: 138.0,
                  child: GestureDetector(
                      onTap: () {
                        log("111");
                      },
                      child: _buildTableContainer('111', 13, 9))),
              Positioned(
                  // Table 112
                  bottom: 272.6,
                  right: 134.0,
                  child: GestureDetector(
                      onTap: () {
                        log("112");
                      },
                      child: _buildTableContainer('112', 9, 11))),
              Positioned(
                  // Table 113
                  bottom: 198.5,
                  right: 254.0,
                  child: GestureDetector(
                      onTap: () {
                        log("113");
                      },
                      child: _buildTableContainer('113', 11, 18))),
              Positioned(
                  // Table 114
                  bottom: 192.5,
                  right: 295.7,
                  child: GestureDetector(
                      onTap: () {
                        log("114");
                      },
                      child: _buildTableContainer('114', 13, 13))),
              Positioned(
                  // Table 115
                  bottom: 160.5,
                  right: 255.0,
                  child: GestureDetector(
                      onTap: () {
                        log("115");
                      },
                      child: _buildTableContainer('115', 19, 20))),
              Positioned(
                // Table 116
                bottom: 134.8,
                right: 192.0,
                child: GestureDetector(
                  onTap: () {
                    log("116");
                  },
                  child: Transform.rotate(
                    angle:
                        -0.8, // Specify the angle in radians (-0.1 radians is approximately -5.7 degrees)
                    child: _buildTableContainer(
                        '116', 9, 33), // Your table container widget
                  ),
                ),
              ),
              Positioned(
                // Table 117
                bottom: 148.0,
                right: 182.0,
                child: GestureDetector(
                  onTap: () {
                    log("117");
                  },
                  child: Transform.rotate(
                    angle:
                        -0.8, // Specify the angle in radians (-0.1 radians is approximately -5.7 degrees)
                    child: _buildTableContainer(
                        '117', 9, 48), // Your table container widget
                  ),
                ),
              ),
              Positioned(
                // Table 118
                bottom: 180.0,
                right: 157.0,
                child: GestureDetector(
                  onTap: () {
                    log("118");
                  },
                  child: Transform.rotate(
                    angle:
                        -0.8, // Specify the angle in radians (-0.1 radians is approximately -5.7 degrees)
                    child: _buildTableContainer(
                        '118', 13, 15), // Your table container widget
                  ),
                ),
              ),
              Positioned(
                  // Table 119
                  bottom: 193.5,
                  right: 133.7,
                  child: GestureDetector(
                      onTap: () {
                        log("119");
                      },
                      child: _buildTableContainer('119', 13, 13))),
              Positioned(
                  // Table 120
                  bottom: 211.5,
                  right: 107.7,
                  child: GestureDetector(
                      onTap: () {
                        log("120");
                      },
                      child: _buildTableContainer('120', 9, 14))),
              Positioned(
                  // Table 121
                  bottom: 245.5,
                  right: 87.7,
                  child: GestureDetector(
                      onTap: () {
                        log("121");
                      },
                      child: _buildTableContainer('121', 10, 10))),
              Positioned(
                // Table 122
                bottom: 185.6,
                right: 89.0,
                child: GestureDetector(
                  onTap: () {
                    log("122");
                  },
                  child: Transform.rotate(
                    angle:
                        -0.8, // Specify the angle in radians (-0.1 radians is approximately -5.7 degrees)
                    child: _buildTableContainer(
                        '122', 13, 13), // Your table container widget
                  ),
                ),
              ),
              Positioned(
                // Table 123
                bottom: 206.6,
                right: 53.0,
                child: GestureDetector(
                  onTap: () {
                    //log("123");
                  },
                  child: Transform.rotate(
                    angle:
                        -0.8, // Specify the angle in radians (-0.1 radians is approximately -5.7 degrees)
                    child: _buildTableContainer(
                        '123', 13.3, 9), // Your table container widget
                  ),
                ),
              ),
              Positioned(
                // Table 124
                bottom: 138.9,
                right: 88.2,
                child: GestureDetector(
                  onTap: () {
                    log("124");
                  },
                  child: Transform.rotate(
                    angle:
                        -0.8, // Specify the angle in radians (-0.1 radians is approximately -5.7 degrees)
                    child: _buildTableContainer(
                        '124', 9, 43), // Your table container widget
                  ),
                ),
              ),
              Positioned(
                // Table 125
                bottom: 156.8,
                right: 66.0,
                child: GestureDetector(
                  onTap: () {
                    log("125");
                  },
                  child: Transform.rotate(
                    angle:
                        -0.8, 
                    child: _buildTableContainer(
                        '125', 9, 29), 
                  ),
                ),
              ),
              Positioned(
                // Table 126
                bottom: 194,
                right: 38.0,
                child: GestureDetector(
                  onTap: () {
                    log("126");
                  },
                  child: Transform.rotate(
                    angle:
                        -0.8, 
                    child: _buildTableContainer(
                        '126', 13.3, 9),
                  ),
                ),
              ),
            ],
          );
        }
      },
    );
  }

  Widget _buildTableContainer(String tableNumber, double width, double height) {
    final tableInfo = tables[tableNumber];
    final color;

    if (tableInfo == null) {
      //Empty table
      color = Colors.green.withOpacity(0.5);
    } else if (tableInfo['currCapacity'] == tableInfo['MaxCapacity']) {
      // full table
      color = Colors.red.withOpacity(0.5);
    } else {
      color = Colors.orange.withOpacity(0.5);
    }

    return GestureDetector(
      onTap: () {
        log(tableNumber);
        int tableNum = int.parse(tableNumber);
        if (tableInfo == null) {
          Navigator.push(
              context,
              MaterialPageRoute(
                  builder: (context) => EmptyTable(
                        tableNum: tableNum,
                      )));
        } else {
          Navigator.push(
              context,
              MaterialPageRoute(
                  builder: (context) => TableInfo(tableJson: tableInfo)));
        }
      },
      child: Container(
        width: width, // Set width according to your design
        height: height, // Set height according to your design
        color: color, // Use the color variable
        child: Center(
          child: RichText(
            text: TextSpan(
              text: tableNumber,
              style: const TextStyle(
                fontSize: 5,
                color: Colors.black,
                fontWeight: FontWeight.bold,
              ),
            ),
          ),
        ),
      ),
    );
  }

  Future<void> getAllTablesOnFloor() async {
    //log(key);
    List<dynamic> allTables;
    try {
      final response = await get(
        Uri.parse('${url}api/all-tables'),
        headers: <String, String>{
          'Content-Type': 'application/json; charset=UTF-8',
        },
      );
      //log('${response.statusCode}');
      if (response.statusCode == 200) {
        log("good response");
        // Decodes JWT made token
        allTables = jsonDecode(response.body);

        log("all table info saved");

        for(var table in allTables) {
          int tableNum = int.parse(table['tableNum']);
          //log(tableNum.toString());
          int floorNum = tableNum~/100;
          if(floorNum == 1) {
            tables[tableNum.toString()] = table;
          }
        }

        log(tables.toString());

        // Redirect to home page
      } else {
        log(jsonDecode(response.body)['error']);
      }
    } catch (e) {
      log('Error: $e');
    }
  }
}
