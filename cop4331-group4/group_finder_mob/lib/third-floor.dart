import 'dart:convert';
import 'dart:ui';
import 'package:group_finder_mob/empty-table.dart';
import 'package:http/http.dart';

import 'table-info.dart';
import 'url.dart';
import 'dart:developer';

import 'package:flutter/material.dart';

class ThirdFloorMap extends StatefulWidget {
  const ThirdFloorMap({super.key});

  @override
  State<ThirdFloorMap> createState() => _ThirdFloorMapState();
}

  class _ThirdFloorMapState extends State<ThirdFloorMap> {
  Map<String, Map<String, dynamic>?> tables = {
    '301': null,
'302': null,
'303': null,
'304': null,
'305': null,
'306': null,
'307': null,
'308': null,
'309': null,
'310': null,
'311': null,
'312': null,
'313': null,
'314': null,
'315': null,
'316': null,
'317': null,
'318': null,
'319': null,
'320': null,
'321': null,
'322': null,
'323': null,
'324': null,
'325': null,
'326': null,
'327': null,
'328': null,
'329': null,
'330': null,
'331': null,
'332': null,
'333': null,
'334': null,
'335': null,
'336': null,
'337': null,
'338': null,
'339': null,
'340': null,
'341': null,
'342': null,
'343': null,
'344': null,
'345': null,
'346': null,
'347': null,
'348': null,
'349': null,
'350': null,
'351': null,
'352': null,
'353': null,
'354': null,
'355': null,
'356': null,
'357': null,
'358': null,
'359': null,
'360': null,
'361': null,
'362': null,
'363': null,
'364': null,
'365': null,
'366': null,
'367': null,
'368': null,
'369': null,
'370': null,
'371': null,
'372': null,
'373': null,
'374': null,
'375': null,
'376': null,
'377': null,
'378': null,
'379': null,
'380': null,
'381': null

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
                'images/ThirdFloorMap.jpg',
                width: 465,
                height: 500,
                fit: BoxFit.fitWidth,
              ),
            ),
              Positioned(
                // Table 301
                bottom: 322.0,
                right: 400,
                child: Transform.rotate(
                  angle: -1.6, 
                  child: _buildTableContainer('301', 9, 9),
                  ),
                ),
              Positioned(
                // Table 302
                bottom: 322.0,
                right: 386,
                child: Transform.rotate(
                  angle: -1.6, 
                  child: _buildTableContainer('302', 9, 9),
                  ),
                ),
                Positioned(
                // Table 303
                bottom: 322,
                right: 372.6,
                child: GestureDetector(
                  onTap: () {
                    log("303");
                  },
                  child: Transform.rotate(
                    angle:-1.6, 
                    child: _buildTableContainer('303', 9, 9),
                  ),
                ),
              ),
                Positioned(
                // Table 304
                bottom: 322,
                right: 357.9,
                child: GestureDetector(
                  onTap: () {
                    log("304");
                  },
                  child: Transform.rotate(
                    angle:-1.6, 
                    child: _buildTableContainer('304', 9, 9),
                  ),
                ),
              ), 
                Positioned(
                // Table 305
                bottom: 307.2,
                right: 340.9,
                child: GestureDetector(
                  onTap: () {
                    log("305");
                  },
                  child: Transform.rotate(
                    angle:-6.3, 
                    child: _buildTableContainer('305', 8.6, 27),
                  ),
                ),
              ),
                Positioned(
                // Table 306
                bottom: 297.2,
                right: 327.1,
                child: GestureDetector(
                  onTap: () {
                    log("306");
                  },
                  child: Transform.rotate(
                    angle:-6.3, 
                    child: _buildTableContainer('306', 8.6, 23),
                  ),
                ),
              ),
                Positioned(
                // Table 307
                bottom: 307.2,
                right: 314.2,
                child: GestureDetector(
                  onTap: () {
                    log("307");
                  },
                  child: Transform.rotate(
                    angle:-6.3, 
                    child: _buildTableContainer('307', 8.6, 27),
                  ),
                ),
              ),
                Positioned(
                // Table 308
                bottom: 225,
                right: 419,
                child: GestureDetector(
                  onTap: () {
                    log("308");
                  },
                  child: Transform.rotate(
                    angle:-1.6, 
                    child: _buildTableContainer('308', 9, 9),
                  ),
                ),
              ),
                Positioned(
                // Table 309
                bottom: 213,
                right: 399.5,
                child: GestureDetector(
                  onTap: () {
                    log("309");
                  },
                  child: Transform.rotate(
                    angle:-1.6, 
                    child: _buildTableContainer('309', 22, 6),
                  ),
                ),
              ),
                Positioned(
                // Table 310
                bottom: 207,
                right: 419,
                child: GestureDetector(
                  onTap: () {
                    log("310");
                  },
                  child: Transform.rotate(
                    angle:-1.6, 
                    child: _buildTableContainer('310', 9, 9),
                  ),
                ),
              ),
                Positioned(
                // Table 311
                bottom: 192,
                right: 419,
                child: GestureDetector(
                  onTap: () {
                    log("311");
                  },
                  child: Transform.rotate(
                    angle:-1.6, 
                    child: _buildTableContainer('311', 9, 9),
                  ),
                ),
              ), 
                Positioned(
                // Table 312
                bottom: 189,
                right: 403.5,
                child: GestureDetector(
                  onTap: () {
                    log("312");
                  },
                  child: Transform.rotate(
                    angle:-1.6, 
                    child: _buildTableContainer('312', 15, 6),
                  ),
                ),
              ), 
                Positioned(
                // Table 313
                bottom: 182,
                right: 417,
                child: GestureDetector(
                  onTap: () {
                    log("313");
                  },
                  child: Transform.rotate(
                    angle:-6.3, 
                    child: _buildTableContainer('313', 9, 6),
                  ),
                ),
              ),
                Positioned(
                // Table 314
                bottom: 212,
                right: 366.6,
                child: GestureDetector(
                  onTap: () {
                    log("314");
                  },
                  child: Transform.rotate(
                    angle:-6.3, 
                    child: _buildTableContainer('314', 9, 6),
                  ),
                ),
              ),
               Positioned(
                // Table 315
                bottom: 203,
                right: 366.6,
                child: GestureDetector(
                  onTap: () {
                    log("315");
                  },
                  child: Transform.rotate(
                    angle:-6.3, 
                    child: _buildTableContainer('315', 9, 6),
                  ),
                ),
              ),
                Positioned(
                // Table 316
                bottom: 201.8,
                right: 349,
                child: GestureDetector(
                  onTap: () {
                    log("316");
                  },
                  child: Transform.rotate(
                    angle:-6.3, 
                    child: _buildTableContainer('316', 9, 6),
                  ),
                ),
              ),
                Positioned(
                // Table 317
                bottom: 201.8,
                right: 349,
                child: GestureDetector(
                  onTap: () {
                    log("317");
                  },
                  child: Transform.rotate(
                    angle:-6.3, 
                    child: _buildTableContainer('317', 9, 6),
                  ),
                ),
              ),
                Positioned(
                // Table 318
                bottom: 192,
                right: 349,
                child: GestureDetector(
                  onTap: () {
                    log("318");
                  },
                  child: Transform.rotate(
                    angle:-6.3, 
                    child: _buildTableContainer('318', 9, 6),
                  ),
                ),
              ),
                Positioned(
                // Table 319
                bottom: 186.7,
                right: 366.6,
                child: GestureDetector(
                  onTap: () {
                    log("319");
                  },
                  child: Transform.rotate(
                    angle:-6.3, 
                    child: _buildTableContainer('319', 9, 6),
                  ),
                ),
              ),
                Positioned(
                // Table 320
                bottom: 176.9,
                right: 366.6,
                child: GestureDetector(
                  onTap: () {
                    log("320");
                  },
                  child: Transform.rotate(
                    angle:-6.3, 
                    child: _buildTableContainer('320', 9, 6),
                  ),
                ),
              ),
                Positioned(
                // Table 321
                bottom: 170,
                right: 337.8,
                child: GestureDetector(
                  onTap: () {
                    log("321");
                  },
                  child: Transform.rotate(
                    angle:-6.3, 
                    child: _buildTableContainer('321', 18, 6),
                  ),
                ),
              ), 
                Positioned(
                // Table 322
                bottom: 170,
                right: 313.2,
                child: GestureDetector(
                  onTap: () {
                    log("322");
                  },
                  child: Transform.rotate(
                    angle:-6.3, 
                    child: _buildTableContainer('322', 18, 6),
                  ),
                ),
              ),
               Positioned(
                // Table 323
                bottom: 150.9,
                right: 365.6,
                child: GestureDetector(
                  onTap: () {
                    log("323");
                  },
                  child: Transform.rotate(
                    angle:-6.3, 
                    child: _buildTableContainer('323', 8.6, 6),
                  ),
                ),
              ),
                Positioned(
                // Table 324
                bottom: 150.9,
                right: 338.5,
                child: GestureDetector(
                  onTap: () {
                    log("324");
                  },
                  child: Transform.rotate(
                    angle:-6.3, 
                    child: _buildTableContainer('324', 8.6, 6),
                  ),
                ),
              ),
               Positioned(
                // Table 325
                bottom: 150.9,
                right: 310.6,
                child: GestureDetector(
                  onTap: () {
                    log("325");
                  },
                  child: Transform.rotate(
                    angle:-6.3, 
                    child: _buildTableContainer('325', 8.6, 6),
                  ),
                ),
              ),
               Positioned(
                // Table 326
                bottom: 150.9,
                right: 310.6,
                child: GestureDetector(
                  onTap: () {
                    log("326");
                  },
                  child: Transform.rotate(
                    angle:-6.3, 
                    child: _buildTableContainer('326', 8.6, 6),
                  ),
                ),
              ),
                Positioned(
                // Table 327
                bottom: 189.9,
                right: 313.6,
                child: GestureDetector(
                  onTap: () {
                    log("327");
                  },
                  child: Transform.rotate(
                    angle:-6.3, 
                    child: _buildTableContainer('327', 8.6, 6),
                  ),
                ),
              ), 
               Positioned(
                // Table 328
                bottom: 245.9,
                right: 289,
                child: GestureDetector(
                  onTap: () {
                    log("328");
                  },
                  child: Transform.rotate(
                    angle:-6.3, 
                    child: _buildTableContainer('328', 8.6, 6),
                  ),
                ),
              ),
               Positioned(
                // Table 329
                bottom: 252.9,
                right: 279.5,
                child: GestureDetector(
                  onTap: () {
                    log("329");
                  },
                  child: Transform.rotate(
                    angle:-6.3, 
                    child: _buildTableContainer('329', 8.6, 6),
                  ),
                ),
              ),
               Positioned(
                // Table 330
                bottom: 245,
                right: 272.7,
                child: GestureDetector(
                  onTap: () {
                    log("330");
                  },
                  child: Transform.rotate(
                    angle:-6.3, 
                    child: _buildTableContainer('330', 8.6, 6),
                  ),
                ),
              ),
               Positioned(
                // Table 331
                bottom: 251.5,
                right: 264.5,
                child: GestureDetector(
                  onTap: () {
                    log("331");
                  },
                  child: Transform.rotate(
                    angle:-6.3, 
                    child: _buildTableContainer('331', 8.6, 6),
                  ),
                ),
              ),
               Positioned(
                // Table 332
                bottom: 235,
                right: 263.5,
                child: GestureDetector(
                  onTap: () {
                    log("332");
                  },
                  child: Transform.rotate(
                    angle:-6.3, 
                    child: _buildTableContainer('332', 8.6, 6),
                  ),
                ),
              ),
               Positioned(
                // Table 333
                bottom: 241,
                right: 254.5,
                child: GestureDetector(
                  onTap: () {
                    log("333");
                  },
                  child: Transform.rotate(
                    angle:-6.3, 
                    child: _buildTableContainer('333', 8.6, 6),
                  ),
                ),
              ),
               Positioned(
                // Table 334
                bottom: 250.6,
                right: 215,
                child: GestureDetector(
                  onTap: () {
                    log("334");
                  },
                  child: Transform.rotate(
                    angle:-6.3, 
                    child: _buildTableContainer('334', 8.6, 6),
                  ),
                ),
              ),
               Positioned(
                // Table 335
                bottom: 239,
                right: 206.9,
                child: GestureDetector(
                  onTap: () {
                    log("335");
                  },
                  child: Transform.rotate(
                    angle:-6.3, 
                    child: _buildTableContainer('335', 8.6, 6),
                  ),
                ),
              ),
               Positioned(
                // Table 336
                bottom: 249.5,
                right: 201.8,
                child: GestureDetector(
                  onTap: () {
                    log("336");
                  },
                  child: Transform.rotate(
                    angle:-6.3, 
                    child: _buildTableContainer('336', 8.6, 6),
                  ),
                ),
              ),
               Positioned(
                // Table 337
                bottom: 246.7,
                right: 189.3,
                child: GestureDetector(
                  onTap: () {
                    log("337");
                  },
                  child: Transform.rotate(
                    angle:-6.3, 
                    child: _buildTableContainer('337', 8.6, 6),
                  ),
                ),
              ),
               Positioned(
                // Table 338
                bottom: 273.7,
                right: 185,
                child: GestureDetector(
                  onTap: () {
                    log("338");
                  },
                  child: Transform.rotate(
                    angle:-6.3, 
                    child: _buildTableContainer('338', 8.6, 6),
                  ),
                ),
              ),
               Positioned(
                // Table 339
                bottom: 269.9,
                right: 171.7,
                child: GestureDetector(
                  onTap: () {
                    log("339");
                  },
                  child: Transform.rotate(
                    angle:-6.3, 
                    child: _buildTableContainer('339', 8.6, 6),
                  ),
                ),
              ),
               Positioned(
                // Table 340
                bottom: 280.9,
                right: 163.7,
                child: GestureDetector(
                  onTap: () {
                    log("340");
                  },
                  child: Transform.rotate(
                    angle:-6.3, 
                    child: _buildTableContainer('340', 8.6, 6),
                  ),
                ),
              ),
                Positioned(
                // Table 341
                bottom: 286.9,
                right: 154,
                child: GestureDetector(
                  onTap: () {
                    log("341");
                  },
                  child: Transform.rotate(
                    angle:-6.3, 
                    child: _buildTableContainer('341', 8.6, 6),
                  ),
                ),
              ),
               Positioned(
                // Table 342
                bottom: 232.7,
                right: 184.3,
                child: GestureDetector(
                  onTap: () {
                    log("342");
                  },
                  child: Transform.rotate(
                    angle:-6.3, 
                    child: _buildTableContainer('342', 8.6, 6),
                  ),
                ),
              ),
                Positioned(
                // Table 343
                bottom: 216.7,
                right: 185.3,
                child: GestureDetector(
                  onTap: () {
                    log("343");
                  },
                  child: Transform.rotate(
                    angle:-6.3, 
                    child: _buildTableContainer('343', 8.6, 6),
                  ),
                ),
              ),
               Positioned(
                // Table 344
                bottom: 246.7,
                right: 177.3,
                child: GestureDetector(
                  onTap: () {
                    log("344");
                  },
                  child: Transform.rotate(
                    angle:-6.3, 
                    child: _buildTableContainer('344', 8.6, 6),
                  ),
                ),
              ),
               Positioned(
                // Table 345
                bottom: 244,
                right: 166,
                child: GestureDetector(
                  onTap: () {
                    log("345");
                  },
                  child: Transform.rotate(
                    angle:-6.3, 
                    child: _buildTableContainer('345', 8.6, 6),
                  ),
                ),
              ),
                Positioned(
                // Table 346
                bottom: 218,
                right: 170.4,
                child: GestureDetector(
                  onTap: () {
                    log("346");
                  },
                  child: Transform.rotate(
                    angle:-6.3, 
                    child: _buildTableContainer('346', 8.6, 6),
                  ),
                ),
              ),
               Positioned(
                // Table 347
                bottom: 208.7,
                right: 172,
                child: GestureDetector(
                  onTap: () {
                    log("347");
                  },
                  child: Transform.rotate(
                    angle:-6.3, 
                    child: _buildTableContainer('347', 8.6, 6),
                  ),
                ),
              ),
               Positioned(
                // Table 348
                bottom: 227,
                right: 162,
                child: GestureDetector(
                  onTap: () {
                    log("348");
                  },
                  child: Transform.rotate(
                    angle:-6.3, 
                    child: _buildTableContainer('348', 8.6, 6),
                  ),
                ),
              ),
               Positioned(
                // Table 349
                bottom: 195,
                right: 164,
                child: GestureDetector(
                  onTap: () {
                    log("349");
                  },
                  child: Transform.rotate(
                    angle:-6.3, 
                    child: _buildTableContainer('349', 8.6, 6),
                  ),
                ),
              ),
               Positioned(
                // Table 350
                bottom: 241,
                right: 153,
                child: GestureDetector(
                  onTap: () {
                    log("350");
                  },
                  child: Transform.rotate(
                    angle:-6.3, 
                    child: _buildTableContainer('350', 8.6, 6),
                  ),
                ),
              ),
               Positioned(
                // Table 351
                bottom: 251,
                right: 149,
                child: GestureDetector(
                  onTap: () {
                    log("351");
                  },
                  child: Transform.rotate(
                    angle:-6.3, 
                    child: _buildTableContainer('351', 8.6, 6),
                  ),
                ),
              ),
               Positioned(
                // Table 352
                bottom: 273,
                right: 145,
                child: GestureDetector(
                  onTap: () {
                    log("352");
                  },
                  child: Transform.rotate(
                    angle:-5.5, 
                    child: _buildTableContainer('352', 8.6, 6),
                  ),
                ),
              ),
               Positioned(
                // Table 353
                bottom: 214,
                right: 145,
                child: GestureDetector(
                  onTap: () {
                    log("353");
                  },
                  child: Transform.rotate(
                    angle:-5.1, 
                    child: _buildTableContainer('353', 17, 6),
                  ),
                ),
              ),
               Positioned(
                // Table 354
                bottom: 195.3,
                right: 146,
                child: GestureDetector(
                  onTap: () {
                    log("354");
                  },
                  child: Transform.rotate(
                    angle: -7,
                    child: _buildTableContainer('354', 8.6, 6),
                  ),
                ),
               ),
                Positioned(
                // Table 355
                bottom: 177,
                right: 147,
                child: GestureDetector(
                  onTap: () {
                    log("355");
                  },
                  child: Transform.rotate(
                    angle:-6.3, 
                    child: _buildTableContainer('355', 8.6, 6),
                  ),
                ),
              ),
               Positioned(
                // Table 356
                bottom: 169,
                right: 150,
                child: GestureDetector(
                  onTap: () {
                    log("356");
                  },
                  child: Transform.rotate(
                    angle:-6.6, 
                    child: _buildTableContainer('356', 8.6, 6),
                  ),
                ),
              ),
               Positioned(
                // Table 357
                bottom: 144,
                right: 154,
                child: GestureDetector(
                  onTap: () {
                    log("357");
                  },
                  child: Transform.rotate(
                    angle:-6.3, 
                    child: _buildTableContainer('357', 8.6, 6),
                  ),
                ),
              ),
               Positioned(
                // Table 358
                bottom: 151,
                right: 147,
                child: GestureDetector(
                  onTap: () {
                    log("358");
                  },
                  child: Transform.rotate(
                    angle:-6.3, 
                    child: _buildTableContainer('358', 8.6, 6),
                  ),
                ),
              ),
               Positioned(
                // Table 359
                bottom: 158,
                right: 140.5,
                child: GestureDetector(
                  onTap: () {
                    log("359");
                  },
                  child: Transform.rotate(
                    angle:-6.3, 
                    child: _buildTableContainer('359', 8.6, 6),
                  ),
                ),
              ),
               Positioned(
                // Table 360
                bottom: 205,
                right: 138.5,
                child: GestureDetector(
                  onTap: () {
                    log("360");
                  },
                  child: Transform.rotate(
                    angle:-6.3, 
                    child: _buildTableContainer('360', 8.6, 6),
                  ),
                ),
              ),
               Positioned(
                // Table 361
                bottom: 190.8,
                right: 127.5,
                child: GestureDetector(
                  onTap: () {
                    log("361");
                  },
                  child: Transform.rotate(
                    angle:-6.8, 
                    child: _buildTableContainer('361', 11, 6),
                  ),
                ),
              ),
               Positioned(
                // Table 362
                bottom: 253.6,
                right: 137,
                child: GestureDetector(
                  onTap: () {
                    log("362");
                  },
                  child: Transform.rotate(
                    angle:-6.3, 
                    child: _buildTableContainer('362', 8.6, 6),
                  ),
                ),
              ),
               Positioned(
                // Table 363
                bottom: 235.6,
                right: 123,
                child: GestureDetector(
                  onTap: () {
                    log("363");
                  },
                  child: Transform.rotate(
                    angle:-5.5, 
                    child: _buildTableContainer('363', 13, 6),
                  ),
                ),
              ),
               Positioned(
                // Table 364
                bottom: 258.6,
                right: 126,
                child: GestureDetector(
                  onTap: () {
                    log("364");
                  },
                  child: Transform.rotate(
                    angle:-6.3, 
                    child: _buildTableContainer('364', 8.6, 6),
                  ),
                ),
              ),
               Positioned(
                // Table 365
                bottom: 257.6,
                right: 96,
                child: GestureDetector(
                  onTap: () {
                    log("365");
                  },
                  child: Transform.rotate(
                    angle:-6.3, 
                    child: _buildTableContainer('365', 8.6, 6),
                  ),
                ),
              ),
               Positioned(
                // Table 366
                bottom: 249.6,
                right: 87,
                child: GestureDetector(
                  onTap: () {
                    log("366");
                  },
                  child: Transform.rotate(
                    angle:-6.3, 
                    child: _buildTableContainer('366', 8.6, 6),
                  ),
                ),
              ),
                Positioned(
                // Table 367
                bottom: 241,
                right: 79,
                child: GestureDetector(
                  onTap: () {
                    log("367");
                  },
                  child: Transform.rotate(
                    angle:-6.3, 
                    child: _buildTableContainer('367', 8.6, 6),
                  ),
                ),
              ),
               Positioned(
                // Table 368
                bottom: 229.5,
                right: 80,
                child: GestureDetector(
                  onTap: () {
                    log("368");
                  },
                  child: Transform.rotate(
                    angle:-6.3, 
                    child: _buildTableContainer('368', 8.6, 6),
                  ),
                ),
              ),
               Positioned(
                // Table 369
                bottom: 232,
                right: 65,
                child: GestureDetector(
                  onTap: () {
                    log("369");
                  },
                  child: Transform.rotate(
                    angle:-7, 
                    child: _buildTableContainer('369', 12, 6),
                  ),
                ),
              ),
               Positioned(
                // Table 370
                bottom: 220,
                right: 62,
                child: GestureDetector(
                  onTap: () {
                    log("370");
                  },
                  child: Transform.rotate(
                    angle:-5, 
                    child: _buildTableContainer('370', 8.6, 6),
                  ),
                ),
              ),
               Positioned(
                // Table 371
                bottom: 205.5,
                right: 69,
                child: GestureDetector(
                  onTap: () {
                    log("371");
                  },
                  child: Transform.rotate(
                    angle:-6.3, 
                    child: _buildTableContainer('371', 8.6, 6),
                  ),
                ),
              ),
               Positioned(
                // Table 372
                bottom: 205.5,
                right: 69,
                child: GestureDetector(
                  onTap: () {
                    log("372");
                  },
                  child: Transform.rotate(
                    angle:-6.3, 
                    child: _buildTableContainer('372', 8.6, 6),
                  ),
                ),
              ),
               Positioned(
                // Table 373
                bottom: 176.5,
                right: 98,
                child: GestureDetector(
                  onTap: () {
                    log("373");
                  },
                  child: Transform.rotate(
                    angle:-4.7, 
                    child: _buildTableContainer('373', 12, 6),
                  ),
                ),
              ),
               Positioned(
                // Table 374
                bottom: 226.5,
                right: 52,
                child: GestureDetector(
                  onTap: () {
                    log("374");
                  },
                  child: Transform.rotate(
                    angle:-6.3, 
                    child: _buildTableContainer('374', 8.6, 6),
                  ),
                ),
              ),
               Positioned(
                // Table 375
                bottom: 214.5,
                right: 53,
                child: GestureDetector(
                  onTap: () {
                    log("375");
                  },
                  child: Transform.rotate(
                    angle:-6.3, 
                    child: _buildTableContainer('375', 8.6, 6),
                  ),
                ),
              ),
               Positioned(
                // Table 376
                bottom: 220.5,
                right: 40,
                child: GestureDetector(
                  onTap: () {
                    log("376");
                  },
                  child: Transform.rotate(
                    angle:-6.3, 
                    child: _buildTableContainer('376', 8.6, 6),
                  ),
                ),
              ),
               Positioned(
                // Table 377
                bottom: 162.5,
                right: 84,
                child: GestureDetector(
                  onTap: () {
                    log("377");
                  },
                  child: Transform.rotate(
                    angle:-6.3, 
                    child: _buildTableContainer('377', 8.6, 6),
                  ),
                ),
              ),
               Positioned(
                // Table 378
                bottom: 162.5,
                right: 74,
                child: GestureDetector(
                  onTap: () {
                    log("378");
                  },
                  child: Transform.rotate(
                    angle:-6.3, 
                    child: _buildTableContainer('378', 8.6, 6),
                  ),
                ),
              ),
              Positioned(
                // Table 379
                bottom: 162.5,
                right: 64,
                child: GestureDetector(
                  onTap: () {
                    log("379");
                  },
                  child: Transform.rotate(
                    angle:-6.3, 
                    child: _buildTableContainer('379', 8.6, 6),
                  ),
                ),
              ),
               Positioned(
                // Table 380
                bottom: 162.5,
                right: 54,
                child: GestureDetector(
                  onTap: () {
                    log("380");
                  },
                  child: Transform.rotate(
                    angle:-6.3, 
                    child: _buildTableContainer('380', 8.6, 6),
                  ),
                ),
              ),
               Positioned(
                // Table 381
                bottom: 162.5,
                right: 44,
                child: GestureDetector(
                  onTap: () {
                    log("381");
                  },
                  child: Transform.rotate(
                    angle:-6.3, 
                    child: _buildTableContainer('381', 8.6, 6),
                  ),
                ),
              ),
               Positioned(
                // Table 382
                bottom: 184.5,
                right: 42,
                child: GestureDetector(
                  onTap: () {
                    log("382");
                  },
                  child: Transform.rotate(
                    angle:-6.3, 
                    child: _buildTableContainer('382', 8.6, 6),
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
        width: width, 
        height: height, 
        color: color, 
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
          if(floorNum == 3) {
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