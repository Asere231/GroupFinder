import 'dart:convert';
import 'dart:ui';
import 'package:group_finder_mob/empty-table.dart';
import 'package:http/http.dart';

import 'table-info.dart';
import 'url.dart';
import 'dart:developer';

import 'package:flutter/material.dart';

class SecondFloorMap extends StatefulWidget {
  const SecondFloorMap({super.key});

@override
  State<SecondFloorMap> createState() => _SecondFloorMapState();
}

  class _SecondFloorMapState extends State<SecondFloorMap> {
  Map<String, Map<String, dynamic>?> tables = {
    '201': null,
    '202': null,
    '203': null,
    '204': null,
    '205': null,
    '206': null,
    '207': null,
    '208': null,
    '209': null,
    '210': null,
    '211': null,
    '212': null,
    '213': null,
    '214': null,
    '215': null,
    '216': null,
    '217': null,
    '218': null,
    '219': null,
    '220': null,
    '221': null,
    '222': null,
    '223': null,
    '224': null,
    '225': null,
    '226': null,
    '227': null,
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
                  'images/SecondFloorMap.jpg',
                  width: 465,
                  height: 500,
                  fit: BoxFit.fitWidth,
                ),
              ),
              Positioned(
                  // Table 201
                  bottom: 301.5,
                  right: 349.0,
                  child: Transform.rotate(
                      angle: 0, // Specify the angle in radians (-0.1 radians is approximately -5.7 degrees)
                      child: _buildTableContainer('201', 8.6, 5), // Your table container widget
                    ),
                  ),
                Positioned(
                  // Table 202
                  bottom: 302,
                  right: 332.0,
                  child: GestureDetector(
                      onTap: () {
                        log("202");
                      },
                    child: _buildTableContainer('202', 8.6, 5))),
                Positioned(
                  // Table 203
                  bottom: 315,
                  right: 288.0,
                  child: GestureDetector(
                      onTap: () {
                        log("203");
                      },
                    child: _buildTableContainer('203', 8.6, 5))),      
              Positioned(
                  // Table 204
                  bottom: 293.5,
                  right: 229.0,
                  child: Transform.rotate(
                      angle: -5.5, // Specify the angle in radians (-0.1 radians is approximately -5.7 degrees)
                      child: _buildTableContainer('204', 11, 5), // Your table container widget
                    ),
                  ),
              Positioned(
                 // Table 205
                  bottom: 302.3,
                  right: 220.0,
                  child: GestureDetector(
                    onTap: () {
                      log("205");
                    },
                    child: Transform.rotate(
                      angle: -5.5, // Specify the angle in radians (-0.1 radians is approximately -5.7 degrees)
                      child: _buildTableContainer('205', 11, 5), // Your table container widget
                    ),
                  ),
                ),
              Positioned(
                 // Table 206
                  bottom: 307.5,
                  right: 215.0,
                  child: GestureDetector(
                    onTap: () {
                      log("206");
                    },
                    child: Transform.rotate(
                      angle: -5.5, // Specify the angle in radians (-0.1 radians is approximately -5.7 degrees)
                      child: _buildTableContainer('206', 11, 5), // Your table container widget
                    ),
                  ),
                ),
              Positioned(
                 // Table 207
                  bottom: 313.5,
                  right: 208.5,
                  child: GestureDetector(
                    onTap: () {
                      log("207");
                    },
                    child: Transform.rotate(
                      angle: -5.5, // Specify the angle in radians (-0.1 radians is approximately -5.7 degrees)
                      child: _buildTableContainer('207', 11, 5), // Your table container widget
                    ),
                  ),
                ),
              Positioned(
                 // Table 208
                  bottom: 318.5,
                  right: 203.5,
                  child: GestureDetector(
                    onTap: () {
                      log("208");
                    },
                    child: Transform.rotate(
                      angle: -5.5, // Specify the angle in radians (-0.1 radians is approximately -5.7 degrees)
                      child: _buildTableContainer('208', 11, 5), // Your table container widget
                    ),
                  ),
                ),
              Positioned(
                 // Table 209
                  bottom: 327.5,
                  right: 194.6,
                  child: GestureDetector(
                    onTap: () {
                      log("209");
                    },
                    child: Transform.rotate(
                      angle: -5.5, // Specify the angle in radians (-0.1 radians is approximately -5.7 degrees)
                      child: _buildTableContainer('209', 11, 5), // Your table container widget
                    ),
                  ),
                ),
              Positioned(
                 // Table 209
                  bottom: 327.5,
                  right: 194.6,
                  child: GestureDetector(
                    onTap: () {
                      log("209");
                    },
                    child: Transform.rotate(
                      angle: -5.5, // Specify the angle in radians (-0.1 radians is approximately -5.7 degrees)
                      child: _buildTableContainer('209', 11, 5), // Your table container widget
                    ),
                  ),
                ),
              Positioned(
                 // Table 210
                  bottom: 321,
                  right: 169.6,
                  child: GestureDetector(
                    onTap: () {
                      log("210");
                    },
                    child: Transform.rotate(
                      angle: -5.5, // Specify the angle in radians (-0.1 radians is approximately -5.7 degrees)
                      child: _buildTableContainer('210', 15, 5), // Your table container widget
                    ),
                  ),
                ),
              Positioned(
                 // Table 211
                  bottom: 306.1,
                  right: 155.6,
                  child: GestureDetector(
                    onTap: () {
                      log("211");
                    },
                    child: Transform.rotate(
                      angle: -5.5, // Specify the angle in radians (-0.1 radians is approximately -5.7 degrees)
                      child: _buildTableContainer('211', 15, 5), // Your table container widget
                    ),
                  ),
                ),      
              Positioned(
                 // Table 212
                  bottom: 235,
                  right: 162.0,
                  child: GestureDetector(
                    onTap: () {
                      log("212");
                    },
                    child: Transform.rotate(
                      angle: -5.5, // Specify the angle in radians (-0.1 radians is approximately -5.7 degrees)
                      child: _buildTableContainer('212', 8.6, 5), // Your table container widget
                    ),
                  ),
                ),
              Positioned(
                 // Table 213
                  bottom: 241,
                  right: 139.5,
                  child: GestureDetector(
                    onTap: () {
                      log("213");
                    },
                    child: Transform.rotate(
                      angle: -7, // Specify the angle in radians (-0.1 radians is approximately -5.7 degrees)
                      child: _buildTableContainer('213', 8.6, 5), // Your table container widget
                    ),
                  ),
                ),
              Positioned(
                 // Table 214
                  bottom: 243.5,
                  right: 120.5,
                  child: GestureDetector(
                    onTap: () {
                      log("214");
                    },
                    child: Transform.rotate(
                      angle: -6.3, // Specify the angle in radians (-0.1 radians is approximately -5.7 degrees)
                      child: _buildTableContainer('214', 8.6, 5), // Your table container widget
                    ),
                  ),
                ),
              Positioned(
                 // Table 215
                  bottom: 248.5,
                  right: 111.5,
                  child: GestureDetector(
                    onTap: () {
                      log("215");
                    },
                    child: Transform.rotate(
                      angle: -6.3, // Specify the angle in radians (-0.1 radians is approximately -5.7 degrees)
                      child: _buildTableContainer('215', 8.6, 5), // Your table container widget
                    ),
                  ),
                ),
              Positioned(
                 // Table 216
                  bottom: 242.5,
                  right: 102.8,
                  child: GestureDetector(
                    onTap: () {
                      log("216");
                    },
                    child: Transform.rotate(
                      angle: -6.3, // Specify the angle in radians (-0.1 radians is approximately -5.7 degrees)
                      child: _buildTableContainer('216', 8.6, 5), // Your table container widget
                    ),
                  ),
                ),
              Positioned(
                 // Table 217
                  bottom: 233,
                  right: 133.5,
                  child: GestureDetector(
                    onTap: () {
                      log("217");
                    },
                    child: Transform.rotate(
                      angle: -7, // Specify the angle in radians (-0.1 radians is approximately -5.7 degrees)
                      child: _buildTableContainer('217', 8.6, 5), // Your table container widget
                    ),
                  ),
                ),
              Positioned(
                 // Table 218
                  bottom: 223,
                  right: 136.9,
                  child: GestureDetector(
                    onTap: () {
                      log("218");
                    },
                    child: Transform.rotate(
                      angle: -6, // Specify the angle in radians (-0.1 radians is approximately -5.7 degrees)
                      child: _buildTableContainer('218', 8.6, 5), // Your table container widget
                    ),
                  ),
                ),               
                Positioned(
                 // Table 219
                  bottom: 222,
                  right: 190.0,
                  child: GestureDetector(
                    onTap: () {
                      log("219");
                    },
                    child: Transform.rotate(
                      angle: -5.5, // Specify the angle in radians (-0.1 radians is approximately -5.7 degrees)
                      child: _buildTableContainer('219', 8.6, 5), // Your table container widget
                    ),
                  ),
                ),
              Positioned(
                 // Table 220
                  bottom: 218,
                  right: 173.0,
                  child: GestureDetector(
                    onTap: () {
                      log("220");
                    },
                    child: Transform.rotate(
                      angle: -5.5, // Specify the angle in radians (-0.1 radians is approximately -5.7 degrees)
                      child: _buildTableContainer('220', 8.6, 5), // Your table container widget
                    ),
                  ),
                ),  
              Positioned(
                 // Table 221
                  bottom: 217,
                  right: 153.3,
                  child: GestureDetector(
                    onTap: () {
                      log("221");
                    },
                    child: Transform.rotate(
                      angle: -6.3, // Specify the angle in radians (-0.1 radians is approximately -5.7 degrees)
                      child: _buildTableContainer('221', 15, 5), // Your table container widget
                    ),
                  ),
                ),
              Positioned(
                 // Table 222
                  bottom: 215,
                  right: 130.9,
                  child: GestureDetector(
                    onTap: () {
                      log("222");
                    },
                    child: Transform.rotate(
                      angle: -7, // Specify the angle in radians (-0.1 radians is approximately -5.7 degrees)
                      child: _buildTableContainer('222', 8.6, 5), // Your table container widget
                    ),
                  ),
                ),
              Positioned(
                 // Table 223
                  bottom: 220.5,
                  right: 90.3,
                  child: GestureDetector(
                    onTap: () {
                      log("223");
                    },
                    child: Transform.rotate(
                      angle: -4.9, // Specify the angle in radians (-0.1 radians is approximately -5.7 degrees)
                      child: _buildTableContainer('223', 15, 5), // Your table container widget
                    ),
                  ),
                ),   
              Positioned(
                 // Table 224
                  bottom: 203.6,
                  right: 153.3,
                  child: GestureDetector(
                    onTap: () {
                      log("224");
                    },
                    child: Transform.rotate(
                      angle: -6.3, // Specify the angle in radians (-0.1 radians is approximately -5.7 degrees)
                      child: _buildTableContainer('224', 15, 5), // Your table container widget
                    ),
                  ),
                ),
              Positioned(
                 // Table 225
                  bottom: 187.9,
                  right: 139,
                  child: GestureDetector(
                    onTap: () {
                      log("225");
                    },
                    child: Transform.rotate(
                      angle: -6.3, // Specify the angle in radians (-0.1 radians is approximately -5.7 degrees)
                      child: _buildTableContainer('225', 8.6, 5), // Your table container widget
                    ),
                  ),
                ),
              Positioned(
                 // Table 226
                  bottom: 183,
                  right: 130,
                  child: GestureDetector(
                    onTap: () {
                      log("226");
                    },
                    child: Transform.rotate(
                      angle: -6.3, // Specify the angle in radians (-0.1 radians is approximately -5.7 degrees)
                      child: _buildTableContainer('226', 8.6, 5), // Your table container widget
                    ),
                  ),
                ),
              Positioned(
                 // Table 227
                  bottom: 172,
                  right: 130,
                  child: GestureDetector(
                    onTap: () {
                      log("227");
                    },
                    child: Transform.rotate(
                      angle: -6.3, // Specify the angle in radians (-0.1 radians is approximately -5.7 degrees)
                      child: _buildTableContainer('227', 8.6, 5), // Your table container widget
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
          if(floorNum == 2) {
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
