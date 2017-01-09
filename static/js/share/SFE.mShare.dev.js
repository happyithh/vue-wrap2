//生成二维码
var QRCode;
(function () {
    function QR8bitByte(data) {
        this.mode = QRMode.MODE_8BIT_BYTE;
        this.data = data;
        this.parsedData = [];

        // Added to support UTF-8 Characters
        for (var i = 0, l = this.data.length; i < l; i++) {
            var byteArray = [];
            var code = this.data.charCodeAt(i);

            if (code > 0x10000) {
                byteArray[0] = 0xF0 | ((code & 0x1C0000) >>> 18);
                byteArray[1] = 0x80 | ((code & 0x3F000) >>> 12);
                byteArray[2] = 0x80 | ((code & 0xFC0) >>> 6);
                byteArray[3] = 0x80 | (code & 0x3F);
            } else if (code > 0x800) {
                byteArray[0] = 0xE0 | ((code & 0xF000) >>> 12);
                byteArray[1] = 0x80 | ((code & 0xFC0) >>> 6);
                byteArray[2] = 0x80 | (code & 0x3F);
            } else if (code > 0x80) {
                byteArray[0] = 0xC0 | ((code & 0x7C0) >>> 6);
                byteArray[1] = 0x80 | (code & 0x3F);
            } else {
                byteArray[0] = code;
            }

            this.parsedData.push(byteArray);
        }

        this.parsedData = Array.prototype.concat.apply([], this.parsedData);

        if (this.parsedData.length != this.data.length) {
            this.parsedData.unshift(191);
            this.parsedData.unshift(187);
            this.parsedData.unshift(239);
        }
    }

    QR8bitByte.prototype = {
        getLength: function (buffer) {
            return this.parsedData.length;
        },
        write: function (buffer) {
            for (var i = 0, l = this.parsedData.length; i < l; i++) {
                buffer.put(this.parsedData[i], 8);
            }
        }
    };

    function QRCodeModel(typeNumber, errorCorrectLevel) {
        this.typeNumber = typeNumber;
        this.errorCorrectLevel = errorCorrectLevel;
        this.modules = null;
        this.moduleCount = 0;
        this.dataCache = null;
        this.dataList = [];
    }

function QRPolynomial(num, shift) {
    if (num.length == undefined) throw new Error(num.length + "/" + shift);
    var offset = 0;
    while (offset < num.length && num[offset] == 0) offset++;
    this.num = new Array(num.length - offset + shift);
    for (var i = 0; i < num.length - offset; i++) this.num[i] = num[i + offset];
}

function QRRSBlock(totalCount, dataCount) {
    this.totalCount = totalCount, this.dataCount = dataCount;
}

function QRBitBuffer() {
    this.buffer = [], this.length = 0;
}

    QRCodeModel.prototype = {
        "addData": function(data) {
            var newData = new QR8bitByte(data);
            this.dataList.push(newData), this.dataCache = null;
        },
        "isDark": function(row, col) {
            if (row < 0 || this.moduleCount <= row || col < 0 || this.moduleCount <= col) throw new Error(row + "," + col);
            return this.modules[row][col];
        },
        "getModuleCount": function() {
            return this.moduleCount;
        },
        "make": function() {
            this.makeImpl(!1, this.getBestMaskPattern());
        },
        "makeImpl": function(test, maskPattern) {
            this.moduleCount = this.typeNumber * 4 + 17, this.modules = new Array(this.moduleCount);
            for (var row = 0; row < this.moduleCount; row++) {
                this.modules[row] = new Array(this.moduleCount);
                for (var col = 0; col < this.moduleCount; col++) this.modules[row][col] = null;
            }
            this.setupPositionProbePattern(0, 0),
            this.setupPositionProbePattern(this.moduleCount - 7, 0),
            this.setupPositionProbePattern(0, this.moduleCount - 7),
            this.setupPositionAdjustPattern(), this.setupTimingPattern(),
            this.setupTypeInfo(test, maskPattern),
            this.typeNumber >= 7 && this.setupTypeNumber(test),
            this.dataCache == null && (this.dataCache = QRCodeModel.createData(this.typeNumber, this.errorCorrectLevel, this.dataList)), this.mapData(this.dataCache, maskPattern);
        },
        "setupPositionProbePattern": function(row, col) {
            for (var r = -1; r <= 7; r++) {
                if (row + r <= -1 || this.moduleCount <= row + r) continue;
                for (var c = -1; c <= 7; c++) {
                    if (col + c <= -1 || this.moduleCount <= col + c) continue;
                    0 <= r && r <= 6 && (c == 0 || c == 6) || 0 <= c && c <= 6 && (r == 0 || r == 6) || 2 <= r && r <= 4 && 2 <= c && c <= 4 ? this.modules[row + r][col + c] = !0 : this.modules[row + r][col + c] = !1;
                }
            }
        },
        "getBestMaskPattern": function() {
            var minLostPoint = 0, pattern = 0;
            for (var i = 0; i < 8; i++) {
                this.makeImpl(!0, i);
                var lostPoint = QRUtil.getLostPoint(this);
                if (i == 0 || minLostPoint > lostPoint) minLostPoint = lostPoint, pattern = i;
            }
            return pattern;
        },
        "createMovieClip": function(target_mc, instance_name, depth) {
            var qr_mc = target_mc.createEmptyMovieClip(instance_name, depth), cs = 1;
            this.make();
            for (var row = 0; row < this.modules.length; row++) {
                var y = row * cs;
                for (var col = 0; col < this.modules[row].length; col++) {
                    var x = col * cs, dark = this.modules[row][col];
                    dark && (qr_mc.beginFill(0, 100), qr_mc.moveTo(x, y), qr_mc.lineTo(x + cs, y), qr_mc.lineTo(x + cs, y + cs), qr_mc.lineTo(x, y + cs), qr_mc.endFill());
                }
            }
            return qr_mc;
        },
        "setupTimingPattern": function() {
            for (var r = 8; r < this.moduleCount - 8; r++) {
                if (this.modules[r][6] != null) continue;
                this.modules[r][6] = r % 2 == 0;
            }
            for (var c = 8; c < this.moduleCount - 8; c++) {
                if (this.modules[6][c] != null) continue;
                this.modules[6][c] = c % 2 == 0;
            }
        },
        "setupPositionAdjustPattern": function() {
            var pos = QRUtil.getPatternPosition(this.typeNumber);
            for (var i = 0; i < pos.length; i++) for (var j = 0; j < pos.length; j++) {
                var row = pos[i], col = pos[j];
                if (this.modules[row][col] != null) continue;
                for (var r = -2; r <= 2; r++) for (var c = -2; c <= 2; c++) r == -2 || r == 2 || c == -2 || c == 2 || r == 0 && c == 0 ? this.modules[row + r][col + c] = !0 : this.modules[row + r][col + c] = !1;
            }
        },
        "setupTypeNumber": function(test) {
            var bits = QRUtil.getBCHTypeNumber(this.typeNumber);
            for (var i = 0; i < 18; i++) {
                var mod = !test && (bits >> i & 1) == 1;
                this.modules[Math.floor(i / 3)][i % 3 + this.moduleCount - 8 - 3] = mod;
            }
            for (var i = 0; i < 18; i++) {
                var mod = !test && (bits >> i & 1) == 1;
                this.modules[i % 3 + this.moduleCount - 8 - 3][Math.floor(i / 3)] = mod;
            }
        },
        "setupTypeInfo": function(test, maskPattern) {
            var data = this.errorCorrectLevel << 3 | maskPattern, bits = QRUtil.getBCHTypeInfo(data);
            for (var i = 0; i < 15; i++) {
                var mod = !test && (bits >> i & 1) == 1;
                i < 6 ? this.modules[i][8] = mod : i < 8 ? this.modules[i + 1][8] = mod : this.modules[this.moduleCount - 15 + i][8] = mod;
            }
            for (var i = 0; i < 15; i++) {
                var mod = !test && (bits >> i & 1) == 1;
                i < 8 ? this.modules[8][this.moduleCount - i - 1] = mod : i < 9 ? this.modules[8][15 - i - 1 + 1] = mod : this.modules[8][15 - i - 1] = mod;
            }
            this.modules[this.moduleCount - 8][8] = !test;
        },
        "mapData": function(data, maskPattern) {
            var inc = -1, row = this.moduleCount - 1, bitIndex = 7, byteIndex = 0;
            for (var col = this.moduleCount - 1; col > 0; col -= 2) {
                col == 6 && col--;
                for (;;) {
                    for (var c = 0; c < 2; c++) if (this.modules[row][col - c] == null) {
                        var dark = !1;
                        byteIndex < data.length && (dark = (data[byteIndex] >>> bitIndex & 1) == 1);
                        var mask = QRUtil.getMask(maskPattern, row, col - c);
                        mask && (dark = !dark), this.modules[row][col - c] = dark, bitIndex--, bitIndex == -1 && (byteIndex++, bitIndex = 7);
                    }
                    row += inc;
                    if (row < 0 || this.moduleCount <= row) {
                        row -= inc, inc = -inc;
                        break;
                    }
                }
            }
        }
    }, QRCodeModel.PAD0 = 236, QRCodeModel.PAD1 = 17, QRCodeModel.createData = function(typeNumber, errorCorrectLevel, dataList) {
        var rsBlocks = QRRSBlock.getRSBlocks(typeNumber, errorCorrectLevel), buffer = new QRBitBuffer;
        for (var i = 0; i < dataList.length; i++) {
            var data = dataList[i];
            buffer.put(data.mode, 4), buffer.put(data.getLength(), QRUtil.getLengthInBits(data.mode, typeNumber)), data.write(buffer);
        }
        var totalDataCount = 0;
        for (var i = 0; i < rsBlocks.length; i++) totalDataCount += rsBlocks[i].dataCount;
        if (buffer.getLengthInBits() > totalDataCount * 8) throw new Error("code length overflow. (" + buffer.getLengthInBits() + ">" + totalDataCount * 8 + ")");
        buffer.getLengthInBits() + 4 <= totalDataCount * 8 && buffer.put(0, 4);
        while (buffer.getLengthInBits() % 8 != 0) buffer.putBit(!1);
        for (;;) {
            if (buffer.getLengthInBits() >= totalDataCount * 8) break;
            buffer.put(QRCodeModel.PAD0, 8);
            if (buffer.getLengthInBits() >= totalDataCount * 8) break;
            buffer.put(QRCodeModel.PAD1, 8);
        }
        return QRCodeModel.createBytes(buffer, rsBlocks);
    }, QRCodeModel.createBytes = function(buffer, rsBlocks) {
        var offset = 0, maxDcCount = 0, maxEcCount = 0, dcdata = new Array(rsBlocks.length), ecdata = new Array(rsBlocks.length);
        for (var r = 0; r < rsBlocks.length; r++) {
            var dcCount = rsBlocks[r].dataCount, ecCount = rsBlocks[r].totalCount - dcCount;
            maxDcCount = Math.max(maxDcCount, dcCount), maxEcCount = Math.max(maxEcCount, ecCount), dcdata[r] = new Array(dcCount);
            for (var i = 0; i < dcdata[r].length; i++) dcdata[r][i] = 255 & buffer.buffer[i + offset];
            offset += dcCount;
            var rsPoly = QRUtil.getErrorCorrectPolynomial(ecCount), rawPoly = new QRPolynomial(dcdata[r], rsPoly.getLength() - 1), modPoly = rawPoly.mod(rsPoly);
            ecdata[r] = new Array(rsPoly.getLength() - 1);
            for (var i = 0; i < ecdata[r].length; i++) {
                var modIndex = i + modPoly.getLength() - ecdata[r].length;
                ecdata[r][i] = modIndex >= 0 ? modPoly.get(modIndex) : 0;
            }
        }
        var totalCodeCount = 0;
        for (var i = 0; i < rsBlocks.length; i++) totalCodeCount += rsBlocks[i].totalCount;
        var data = new Array(totalCodeCount), index = 0;
        for (var i = 0; i < maxDcCount; i++) for (var r = 0; r < rsBlocks.length; r++) i < dcdata[r].length && (data[index++] = dcdata[r][i]);
        for (var i = 0; i < maxEcCount; i++) for (var r = 0; r < rsBlocks.length; r++) i < ecdata[r].length && (data[index++] = ecdata[r][i]);
        return data;
    };

    var QRMode = {
        "MODE_NUMBER": 1,
        "MODE_ALPHA_NUM": 2,
        "MODE_8BIT_BYTE": 4,
        "MODE_KANJI": 8
    }, QRErrorCorrectLevel = {
        "L": 1,
        "M": 0,
        "Q": 3,
        "H": 2
    }, QRMaskPattern = {
        "PATTERN000": 0,
        "PATTERN001": 1,
        "PATTERN010": 2,
        "PATTERN011": 3,
        "PATTERN100": 4,
        "PATTERN101": 5,
        "PATTERN110": 6,
        "PATTERN111": 7
    }, QRUtil = {
        "PATTERN_POSITION_TABLE": [ [], [ 6, 18 ], [ 6, 22 ], [ 6, 26 ], [ 6, 30 ], [ 6, 34 ], [ 6, 22, 38 ], [ 6, 24, 42 ], [ 6, 26, 46 ], [ 6, 28, 50 ], [ 6, 30, 54 ], [ 6, 32, 58 ], [ 6, 34, 62 ], [ 6, 26, 46, 66 ], [ 6, 26, 48, 70 ], [ 6, 26, 50, 74 ], [ 6, 30, 54, 78 ], [ 6, 30, 56, 82 ], [ 6, 30, 58, 86 ], [ 6, 34, 62, 90 ], [ 6, 28, 50, 72, 94 ], [ 6, 26, 50, 74, 98 ], [ 6, 30, 54, 78, 102 ], [ 6, 28, 54, 80, 106 ], [ 6, 32, 58, 84, 110 ], [ 6, 30, 58, 86, 114 ], [ 6, 34, 62, 90, 118 ], [ 6, 26, 50, 74, 98, 122 ], [ 6, 30, 54, 78, 102, 126 ], [ 6, 26, 52, 78, 104, 130 ], [ 6, 30, 56, 82, 108, 134 ], [ 6, 34, 60, 86, 112, 138 ], [ 6, 30, 58, 86, 114, 142 ], [ 6, 34, 62, 90, 118, 146 ], [ 6, 30, 54, 78, 102, 126, 150 ], [ 6, 24, 50, 76, 102, 128, 154 ], [ 6, 28, 54, 80, 106, 132, 158 ], [ 6, 32, 58, 84, 110, 136, 162 ], [ 6, 26, 54, 82, 110, 138, 166 ], [ 6, 30, 58, 86, 114, 142, 170 ] ],
        "G15": 1335,
        "G18": 7973,
        "G15_MASK": 21522,
        "getBCHTypeInfo": function(data) {
            var d = data << 10;
            while (QRUtil.getBCHDigit(d) - QRUtil.getBCHDigit(QRUtil.G15) >= 0) d ^= QRUtil.G15 << QRUtil.getBCHDigit(d) - QRUtil.getBCHDigit(QRUtil.G15);
            return (data << 10 | d) ^ QRUtil.G15_MASK;
        },
        "getBCHTypeNumber": function(data) {
            var d = data << 12;
            while (QRUtil.getBCHDigit(d) - QRUtil.getBCHDigit(QRUtil.G18) >= 0) d ^= QRUtil.G18 << QRUtil.getBCHDigit(d) - QRUtil.getBCHDigit(QRUtil.G18);
            return data << 12 | d;
        },
        "getBCHDigit": function(data) {
            var digit = 0;
            while (data != 0) digit++, data >>>= 1;
            return digit;
        },
        "getPatternPosition": function(typeNumber) {
            return QRUtil.PATTERN_POSITION_TABLE[typeNumber - 1];
        },
        "getMask": function(maskPattern, i, j) {
            switch (maskPattern) {
              case QRMaskPattern.PATTERN000:
                return (i + j) % 2 == 0;
              case QRMaskPattern.PATTERN001:
                return i % 2 == 0;
              case QRMaskPattern.PATTERN010:
                return j % 3 == 0;
              case QRMaskPattern.PATTERN011:
                return (i + j) % 3 == 0;
              case QRMaskPattern.PATTERN100:
                return (Math.floor(i / 2) + Math.floor(j / 3)) % 2 == 0;
              case QRMaskPattern.PATTERN101:
                return i * j % 2 + i * j % 3 == 0;
              case QRMaskPattern.PATTERN110:
                return (i * j % 2 + i * j % 3) % 2 == 0;
              case QRMaskPattern.PATTERN111:
                return (i * j % 3 + (i + j) % 2) % 2 == 0;
              default:
                throw new Error("bad maskPattern:" + maskPattern);
            }
        },
        "getErrorCorrectPolynomial": function(errorCorrectLength) {
            var a = new QRPolynomial([ 1 ], 0);
            for (var i = 0; i < errorCorrectLength; i++) a = a.multiply(new QRPolynomial([ 1, QRMath.gexp(i) ], 0));
            return a;
        },
        "getLengthInBits": function(mode, type) {
            if (1 <= type && type < 10) switch (mode) {
              case QRMode.MODE_NUMBER:
                return 10;
              case QRMode.MODE_ALPHA_NUM:
                return 9;
              case QRMode.MODE_8BIT_BYTE:
                return 8;
              case QRMode.MODE_KANJI:
                return 8;
              default:
                throw new Error("mode:" + mode);
            } else if (type < 27) switch (mode) {
              case QRMode.MODE_NUMBER:
                return 12;
              case QRMode.MODE_ALPHA_NUM:
                return 11;
              case QRMode.MODE_8BIT_BYTE:
                return 16;
              case QRMode.MODE_KANJI:
                return 10;
              default:
                throw new Error("mode:" + mode);
            } else {
                if (!(type < 41)) throw new Error("type:" + type);
                switch (mode) {
                  case QRMode.MODE_NUMBER:
                    return 14;
                  case QRMode.MODE_ALPHA_NUM:
                    return 13;
                  case QRMode.MODE_8BIT_BYTE:
                    return 16;
                  case QRMode.MODE_KANJI:
                    return 12;
                  default:
                    throw new Error("mode:" + mode);
                }
            }
        },
        "getLostPoint": function(qrCode) {
            var moduleCount = qrCode.getModuleCount(), lostPoint = 0;
            for (var row = 0; row < moduleCount; row++) for (var col = 0; col < moduleCount; col++) {
                var sameCount = 0, dark = qrCode.isDark(row, col);
                for (var r = -1; r <= 1; r++) {
                    if (row + r < 0 || moduleCount <= row + r) continue;
                    for (var c = -1; c <= 1; c++) {
                        if (col + c < 0 || moduleCount <= col + c) continue;
                        if (r == 0 && c == 0) continue;
                        dark == qrCode.isDark(row + r, col + c) && sameCount++;
                    }
                }
                sameCount > 5 && (lostPoint += 3 + sameCount - 5);
            }
            for (var row = 0; row < moduleCount - 1; row++) for (var col = 0; col < moduleCount - 1; col++) {
                var count = 0;
                qrCode.isDark(row, col) && count++, qrCode.isDark(row + 1, col) && count++, qrCode.isDark(row, col + 1) && count++, qrCode.isDark(row + 1, col + 1) && count++;
                if (count == 0 || count == 4) lostPoint += 3;
            }
            for (var row = 0; row < moduleCount; row++) for (var col = 0; col < moduleCount - 6; col++) qrCode.isDark(row, col) && !qrCode.isDark(row, col + 1) && qrCode.isDark(row, col + 2) && qrCode.isDark(row, col + 3) && qrCode.isDark(row, col + 4) && !qrCode.isDark(row, col + 5) && qrCode.isDark(row, col + 6) && (lostPoint += 40);
            for (var col = 0; col < moduleCount; col++) for (var row = 0; row < moduleCount - 6; row++) qrCode.isDark(row, col) && !qrCode.isDark(row + 1, col) && qrCode.isDark(row + 2, col) && qrCode.isDark(row + 3, col) && qrCode.isDark(row + 4, col) && !qrCode.isDark(row + 5, col) && qrCode.isDark(row + 6, col) && (lostPoint += 40);
            var darkCount = 0;
            for (var col = 0; col < moduleCount; col++) for (var row = 0; row < moduleCount; row++) qrCode.isDark(row, col) && darkCount++;
            var ratio = Math.abs(100 * darkCount / moduleCount / moduleCount - 50) / 5;
            return lostPoint += ratio * 10, lostPoint;
        }
    }, QRMath = {
        "glog": function(n) {
            if (n < 1) throw new Error("glog(" + n + ")");
            return QRMath.LOG_TABLE[n];
        },
        "gexp": function(n) {
            while (n < 0) n += 255;
            while (n >= 256) n -= 255;
            return QRMath.EXP_TABLE[n];
        },
        "EXP_TABLE": new Array(256),
        "LOG_TABLE": new Array(256)
    };

    for (var i = 0; i < 8; i++) QRMath.EXP_TABLE[i] = 1 << i;

    for (var i = 8; i < 256; i++) QRMath.EXP_TABLE[i] = QRMath.EXP_TABLE[i - 4] ^ QRMath.EXP_TABLE[i - 5] ^ QRMath.EXP_TABLE[i - 6] ^ QRMath.EXP_TABLE[i - 8];

    for (var i = 0; i < 255; i++) QRMath.LOG_TABLE[QRMath.EXP_TABLE[i]] = i;

    QRPolynomial.prototype = {
        "get": function(index) {
            return this.num[index];
        },
        "getLength": function() {
            return this.num.length;
        },
        "multiply": function(e) {
            var num = new Array(this.getLength() + e.getLength() - 1);
            for (var i = 0; i < this.getLength(); i++) for (var j = 0; j < e.getLength(); j++) num[i + j] ^= QRMath.gexp(QRMath.glog(this.get(i)) + QRMath.glog(e.get(j)));
            return new QRPolynomial(num, 0);
        },
        "mod": function(e) {
            if (this.getLength() - e.getLength() < 0) return this;
            var ratio = QRMath.glog(this.get(0)) - QRMath.glog(e.get(0)), num = new Array(this.getLength());
            for (var i = 0; i < this.getLength(); i++) num[i] = this.get(i);
            for (var i = 0; i < e.getLength(); i++) num[i] ^= QRMath.gexp(QRMath.glog(e.get(i)) + ratio);
            return (new QRPolynomial(num, 0)).mod(e);
        }
    }, QRRSBlock.RS_BLOCK_TABLE = [ [ 1, 26, 19 ], [ 1, 26, 16 ], [ 1, 26, 13 ], [ 1, 26, 9 ], [ 1, 44, 34 ], [ 1, 44, 28 ], [ 1, 44, 22 ], [ 1, 44, 16 ], [ 1, 70, 55 ], [ 1, 70, 44 ], [ 2, 35, 17 ], [ 2, 35, 13 ], [ 1, 100, 80 ], [ 2, 50, 32 ], [ 2, 50, 24 ], [ 4, 25, 9 ], [ 1, 134, 108 ], [ 2, 67, 43 ], [ 2, 33, 15, 2, 34, 16 ], [ 2, 33, 11, 2, 34, 12 ], [ 2, 86, 68 ], [ 4, 43, 27 ], [ 4, 43, 19 ], [ 4, 43, 15 ], [ 2, 98, 78 ], [ 4, 49, 31 ], [ 2, 32, 14, 4, 33, 15 ], [ 4, 39, 13, 1, 40, 14 ], [ 2, 121, 97 ], [ 2, 60, 38, 2, 61, 39 ], [ 4, 40, 18, 2, 41, 19 ], [ 4, 40, 14, 2, 41, 15 ], [ 2, 146, 116 ], [ 3, 58, 36, 2, 59, 37 ], [ 4, 36, 16, 4, 37, 17 ], [ 4, 36, 12, 4, 37, 13 ], [ 2, 86, 68, 2, 87, 69 ], [ 4, 69, 43, 1, 70, 44 ], [ 6, 43, 19, 2, 44, 20 ], [ 6, 43, 15, 2, 44, 16 ], [ 4, 101, 81 ], [ 1, 80, 50, 4, 81, 51 ], [ 4, 50, 22, 4, 51, 23 ], [ 3, 36, 12, 8, 37, 13 ], [ 2, 116, 92, 2, 117, 93 ], [ 6, 58, 36, 2, 59, 37 ], [ 4, 46, 20, 6, 47, 21 ], [ 7, 42, 14, 4, 43, 15 ], [ 4, 133, 107 ], [ 8, 59, 37, 1, 60, 38 ], [ 8, 44, 20, 4, 45, 21 ], [ 12, 33, 11, 4, 34, 12 ], [ 3, 145, 115, 1, 146, 116 ], [ 4, 64, 40, 5, 65, 41 ], [ 11, 36, 16, 5, 37, 17 ], [ 11, 36, 12, 5, 37, 13 ], [ 5, 109, 87, 1, 110, 88 ], [ 5, 65, 41, 5, 66, 42 ], [ 5, 54, 24, 7, 55, 25 ], [ 11, 36, 12 ], [ 5, 122, 98, 1, 123, 99 ], [ 7, 73, 45, 3, 74, 46 ], [ 15, 43, 19, 2, 44, 20 ], [ 3, 45, 15, 13, 46, 16 ], [ 1, 135, 107, 5, 136, 108 ], [ 10, 74, 46, 1, 75, 47 ], [ 1, 50, 22, 15, 51, 23 ], [ 2, 42, 14, 17, 43, 15 ], [ 5, 150, 120, 1, 151, 121 ], [ 9, 69, 43, 4, 70, 44 ], [ 17, 50, 22, 1, 51, 23 ], [ 2, 42, 14, 19, 43, 15 ], [ 3, 141, 113, 4, 142, 114 ], [ 3, 70, 44, 11, 71, 45 ], [ 17, 47, 21, 4, 48, 22 ], [ 9, 39, 13, 16, 40, 14 ], [ 3, 135, 107, 5, 136, 108 ], [ 3, 67, 41, 13, 68, 42 ], [ 15, 54, 24, 5, 55, 25 ], [ 15, 43, 15, 10, 44, 16 ], [ 4, 144, 116, 4, 145, 117 ], [ 17, 68, 42 ], [ 17, 50, 22, 6, 51, 23 ], [ 19, 46, 16, 6, 47, 17 ], [ 2, 139, 111, 7, 140, 112 ], [ 17, 74, 46 ], [ 7, 54, 24, 16, 55, 25 ], [ 34, 37, 13 ], [ 4, 151, 121, 5, 152, 122 ], [ 4, 75, 47, 14, 76, 48 ], [ 11, 54, 24, 14, 55, 25 ], [ 16, 45, 15, 14, 46, 16 ], [ 6, 147, 117, 4, 148, 118 ], [ 6, 73, 45, 14, 74, 46 ], [ 11, 54, 24, 16, 55, 25 ], [ 30, 46, 16, 2, 47, 17 ], [ 8, 132, 106, 4, 133, 107 ], [ 8, 75, 47, 13, 76, 48 ], [ 7, 54, 24, 22, 55, 25 ], [ 22, 45, 15, 13, 46, 16 ], [ 10, 142, 114, 2, 143, 115 ], [ 19, 74, 46, 4, 75, 47 ], [ 28, 50, 22, 6, 51, 23 ], [ 33, 46, 16, 4, 47, 17 ], [ 8, 152, 122, 4, 153, 123 ], [ 22, 73, 45, 3, 74, 46 ], [ 8, 53, 23, 26, 54, 24 ], [ 12, 45, 15, 28, 46, 16 ], [ 3, 147, 117, 10, 148, 118 ], [ 3, 73, 45, 23, 74, 46 ], [ 4, 54, 24, 31, 55, 25 ], [ 11, 45, 15, 31, 46, 16 ], [ 7, 146, 116, 7, 147, 117 ], [ 21, 73, 45, 7, 74, 46 ], [ 1, 53, 23, 37, 54, 24 ], [ 19, 45, 15, 26, 46, 16 ], [ 5, 145, 115, 10, 146, 116 ], [ 19, 75, 47, 10, 76, 48 ], [ 15, 54, 24, 25, 55, 25 ], [ 23, 45, 15, 25, 46, 16 ], [ 13, 145, 115, 3, 146, 116 ], [ 2, 74, 46, 29, 75, 47 ], [ 42, 54, 24, 1, 55, 25 ], [ 23, 45, 15, 28, 46, 16 ], [ 17, 145, 115 ], [ 10, 74, 46, 23, 75, 47 ], [ 10, 54, 24, 35, 55, 25 ], [ 19, 45, 15, 35, 46, 16 ], [ 17, 145, 115, 1, 146, 116 ], [ 14, 74, 46, 21, 75, 47 ], [ 29, 54, 24, 19, 55, 25 ], [ 11, 45, 15, 46, 46, 16 ], [ 13, 145, 115, 6, 146, 116 ], [ 14, 74, 46, 23, 75, 47 ], [ 44, 54, 24, 7, 55, 25 ], [ 59, 46, 16, 1, 47, 17 ], [ 12, 151, 121, 7, 152, 122 ], [ 12, 75, 47, 26, 76, 48 ], [ 39, 54, 24, 14, 55, 25 ], [ 22, 45, 15, 41, 46, 16 ], [ 6, 151, 121, 14, 152, 122 ], [ 6, 75, 47, 34, 76, 48 ], [ 46, 54, 24, 10, 55, 25 ], [ 2, 45, 15, 64, 46, 16 ], [ 17, 152, 122, 4, 153, 123 ], [ 29, 74, 46, 14, 75, 47 ], [ 49, 54, 24, 10, 55, 25 ], [ 24, 45, 15, 46, 46, 16 ], [ 4, 152, 122, 18, 153, 123 ], [ 13, 74, 46, 32, 75, 47 ], [ 48, 54, 24, 14, 55, 25 ], [ 42, 45, 15, 32, 46, 16 ], [ 20, 147, 117, 4, 148, 118 ], [ 40, 75, 47, 7, 76, 48 ], [ 43, 54, 24, 22, 55, 25 ], [ 10, 45, 15, 67, 46, 16 ], [ 19, 148, 118, 6, 149, 119 ], [ 18, 75, 47, 31, 76, 48 ], [ 34, 54, 24, 34, 55, 25 ], [ 20, 45, 15, 61, 46, 16 ] ], QRRSBlock.getRSBlocks = function(typeNumber, errorCorrectLevel) {
        var rsBlock = QRRSBlock.getRsBlockTable(typeNumber, errorCorrectLevel);
        if (rsBlock == undefined) throw new Error("bad rs block @ typeNumber:" + typeNumber + "/errorCorrectLevel:" + errorCorrectLevel);
        var length = rsBlock.length / 3, list = [];
        for (var i = 0; i < length; i++) {
            var count = rsBlock[i * 3 + 0], totalCount = rsBlock[i * 3 + 1], dataCount = rsBlock[i * 3 + 2];
            for (var j = 0; j < count; j++) list.push(new QRRSBlock(totalCount, dataCount));
        }
        return list;
    }, QRRSBlock.getRsBlockTable = function(typeNumber, errorCorrectLevel) {
        switch (errorCorrectLevel) {
          case QRErrorCorrectLevel.L:
            return QRRSBlock.RS_BLOCK_TABLE[(typeNumber - 1) * 4 + 0];
          case QRErrorCorrectLevel.M:
            return QRRSBlock.RS_BLOCK_TABLE[(typeNumber - 1) * 4 + 1];
          case QRErrorCorrectLevel.Q:
            return QRRSBlock.RS_BLOCK_TABLE[(typeNumber - 1) * 4 + 2];
          case QRErrorCorrectLevel.H:
            return QRRSBlock.RS_BLOCK_TABLE[(typeNumber - 1) * 4 + 3];
          default:
            return undefined;
        }
    }, QRBitBuffer.prototype = {
        "get": function(index) {
            var bufIndex = Math.floor(index / 8);
            return (this.buffer[bufIndex] >>> 7 - index % 8 & 1) == 1;
        },
        "put": function(num, length) {
            for (var i = 0; i < length; i++) this.putBit((num >>> length - i - 1 & 1) == 1);
        },
        "getLengthInBits": function() {
            return this.length;
        },
        "putBit": function(bit) {
            var bufIndex = Math.floor(this.length / 8);
            this.buffer.length <= bufIndex && this.buffer.push(0), bit && (this.buffer[bufIndex] |= 128 >>> this.length % 8), this.length++;
        }
    };
    var QRCodeLimitLength=[[17,14,11,7],[32,26,20,14],[53,42,32,24],[78,62,46,34],[106,84,60,44],[134,106,74,58],[154,122,86,64],[192,152,108,84],[230,180,130,98],[271,213,151,119],[321,251,177,137],[367,287,203,155],[425,331,241,177],[458,362,258,194],[520,412,292,220],[586,450,322,250],[644,504,364,280],[718,560,394,310],[792,624,442,338],[858,666,482,382],[929,711,509,403],[1003,779,565,439],[1091,857,611,461],[1171,911,661,511],[1273,997,715,535],[1367,1059,751,593],[1465,1125,805,625],[1528,1190,868,658],[1628,1264,908,698],[1732,1370,982,742],[1840,1452,1030,790],[1952,1538,1112,842],[2068,1628,1168,898],[2188,1722,1228,958],[2303,1809,1283,983],[2431,1911,1351,1051],[2563,1989,1423,1093],[2699,2099,1499,1139],[2809,2213,1579,1219],[2953,2331,1663,1273]];

    function _isSupportCanvas() {
        return typeof CanvasRenderingContext2D != "undefined";
    }

    // android 2.x doesn't support Data-URI spec
    function _getAndroid() {
        var android = false;
        var sAgent = navigator.userAgent;

        if (/android/i.test(sAgent)) { // android
            android = true;
            aMat = sAgent.toString().match(/android ([0-9]\.[0-9])/i);

            if (aMat && aMat[1]) {
                android = parseFloat(aMat[1]);
            }
        }

        return android;
    }

    var svgDrawer = (function() {

        var Drawing = function (el, htOption) {
            this._el = el;
            this._htOption = htOption;
        };

        Drawing.prototype.draw = function (oQRCode) {
            var _htOption = this._htOption;
            var _el = this._el;
            var nCount = oQRCode.getModuleCount();
            var nWidth = Math.floor(_htOption.width / nCount);
            var nHeight = Math.floor(_htOption.height / nCount);

            this.clear();

            function makeSVG(tag, attrs) {
                var el = document.createElementNS('http://www.w3.org/2000/svg', tag);
                for (var k in attrs)
                    if (attrs.hasOwnProperty(k)) el.setAttribute(k, attrs[k]);
                return el;
            }

            var svg = makeSVG("svg" , {'viewBox': '0 0 ' + String(nCount) + " " + String(nCount), 'width': '100%', 'height': '100%', 'fill': _htOption.colorLight});
            svg.setAttributeNS("http://www.w3.org/2000/xmlns/", "xmlns:xlink", "http://www.w3.org/1999/xlink");
            _el.appendChild(svg);

            svg.appendChild(makeSVG("rect", {"fill": _htOption.colorDark, "width": "1", "height": "1", "id": "template"}));

            for (var row = 0; row < nCount; row++) {
                for (var col = 0; col < nCount; col++) {
                    if (oQRCode.isDark(row, col)) {
                        var child = makeSVG("use", {"x": String(row), "y": String(col)});
                        child.setAttributeNS("http://www.w3.org/1999/xlink", "href", "#template")
                        svg.appendChild(child);
                    }
                }
            }
        };
        Drawing.prototype.clear = function () {
            while (this._el.hasChildNodes())
                this._el.removeChild(this._el.lastChild);
        };
        return Drawing;
    })();

    var useSVG = document.documentElement.tagName.toLowerCase() === "svg";

    // Drawing in DOM by using Table tag
    var Drawing = useSVG ? svgDrawer : !_isSupportCanvas() ? (function () {
        var Drawing = function (el, htOption) {
            this._el = el;
            this._htOption = htOption;
        };

        /**
         * Draw the QRCode
         *
         * @param {QRCode} oQRCode
         */
        Drawing.prototype.draw = function (oQRCode) {
            var _htOption = this._htOption;
            var _el = this._el;
            var nCount = oQRCode.getModuleCount();
            var nWidth = Math.floor(_htOption.width / nCount);
            var nHeight = Math.floor(_htOption.height / nCount);
            var aHTML = ['<table style="border:0;border-collapse:collapse;">'];

            for (var row = 0; row < nCount; row++) {
                aHTML.push('<tr>');

                for (var col = 0; col < nCount; col++) {
                    aHTML.push('<td style="border:0;border-collapse:collapse;padding:0;margin:0;width:' + nWidth + 'px;height:' + nHeight + 'px;background-color:' + (oQRCode.isDark(row, col) ? _htOption.colorDark : _htOption.colorLight) + ';"></td>');
                }

                aHTML.push('</tr>');
            }

            aHTML.push('</table>');
            _el.innerHTML = aHTML.join('');

            // Fix the margin values as real size.
            var elTable = _el.childNodes[0];
            var nLeftMarginTable = (_htOption.width - elTable.offsetWidth) / 2;
            var nTopMarginTable = (_htOption.height - elTable.offsetHeight) / 2;
            if (nLeftMarginTable > 0 && nTopMarginTable > 0) {
                elTable.style.margin = nTopMarginTable + "px " + nLeftMarginTable + "px";
            }
        };

        /**
         * Clear the QRCode
         */
        Drawing.prototype.clear = function () {
            this._el.innerHTML = '';
        };

        return Drawing;
    })() : (function () { // Drawing in Canvas
        function _onMakeImage() {
            this._elImage.src = this._elCanvas.toDataURL("image/png");
            this._elImage.style.display = "block";
            this._elCanvas.style.display = "none";
        }

        // Android 2.1 bug workaround
        // http://code.google.com/p/android/issues/detail?id=5141
        if (this._android && this._android <= 2.1) {
            var factor = 1 / window.devicePixelRatio;
            var drawImage = CanvasRenderingContext2D.prototype.drawImage;
            CanvasRenderingContext2D.prototype.drawImage = function (image, sx, sy, sw, sh, dx, dy, dw, dh) {
                if (("nodeName" in image) && /img/i.test(image.nodeName)) {
                    for (var i = arguments.length - 1; i >= 1; i--) {
                        arguments[i] = arguments[i] * factor;
                    }
                } else if (typeof dw == "undefined") {
                    arguments[1] *= factor;
                    arguments[2] *= factor;
                    arguments[3] *= factor;
                    arguments[4] *= factor;
                }

                drawImage.apply(this, arguments);
            };
        }

        /**
         * Check whether the user's browser supports Data URI or not
         *
         * @private
         * @param {Function} fSuccess Occurs if it supports Data URI
         * @param {Function} fFail Occurs if it doesn't support Data URI
         */
        function _safeSetDataURI(fSuccess, fFail) {
            var self = this;
            self._fFail = fFail;
            self._fSuccess = fSuccess;

            // Check it just once
            if (self._bSupportDataURI === null) {
                var el = document.createElement("img");
                var fOnError = function() {
                    self._bSupportDataURI = false;

                    if (self._fFail) {
                        _fFail.call(self);
                    }
                };
                var fOnSuccess = function() {
                    self._bSupportDataURI = true;

                    if (self._fSuccess) {
                        self._fSuccess.call(self);
                    }
                };

                el.onabort = fOnError;
                el.onerror = fOnError;
                el.onload = fOnSuccess;
                el.src = "data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg=="; // the Image contains 1px data.
                return;
            } else if (self._bSupportDataURI === true && self._fSuccess) {
                self._fSuccess.call(self);
            } else if (self._bSupportDataURI === false && self._fFail) {
                self._fFail.call(self);
            }
        };

        /**
         * Drawing QRCode by using canvas
         *
         * @constructor
         * @param {HTMLElement} el
         * @param {Object} htOption QRCode Options
         */
        var Drawing = function (el, htOption) {
            this._bIsPainted = false;
            this._android = _getAndroid();

            this._htOption = htOption;
            this._elCanvas = document.createElement("canvas");
            this._elCanvas.width = htOption.width;
            this._elCanvas.height = htOption.height;
            el.appendChild(this._elCanvas);
            this._el = el;
            this._oContext = this._elCanvas.getContext("2d");
            this._bIsPainted = false;
            this._elImage = document.createElement("img");
            this._elImage.alt = "Scan me!";
            this._elImage.style.display = "none";
            this._el.appendChild(this._elImage);
            this._bSupportDataURI = null;
        };

        /**
         * Draw the QRCode
         *
         * @param {QRCode} oQRCode
         */
        Drawing.prototype.draw = function (oQRCode) {
            var _elImage = this._elImage;
            var _oContext = this._oContext;
            var _htOption = this._htOption;

            var nCount = oQRCode.getModuleCount();
            var nWidth = _htOption.width / nCount;
            var nHeight = _htOption.height / nCount;
            var nRoundedWidth = Math.round(nWidth);
            var nRoundedHeight = Math.round(nHeight);

            _elImage.style.display = "none";
            this.clear();

            for (var row = 0; row < nCount; row++) {
                for (var col = 0; col < nCount; col++) {
                    var bIsDark = oQRCode.isDark(row, col);
                    var nLeft = col * nWidth;
                    var nTop = row * nHeight;
                    _oContext.strokeStyle = bIsDark ? _htOption.colorDark : _htOption.colorLight;
                    _oContext.lineWidth = 1;
                    _oContext.fillStyle = bIsDark ? _htOption.colorDark : _htOption.colorLight;
                    _oContext.fillRect(nLeft, nTop, nWidth, nHeight);

                    // 안티 앨리어싱 방지 처리
                    _oContext.strokeRect(
                        Math.floor(nLeft) + 0.5,
                        Math.floor(nTop) + 0.5,
                        nRoundedWidth,
                        nRoundedHeight
                    );

                    _oContext.strokeRect(
                        Math.ceil(nLeft) - 0.5,
                        Math.ceil(nTop) - 0.5,
                        nRoundedWidth,
                        nRoundedHeight
                    );
                }
            }

            this._bIsPainted = true;
        };

        /**
         * Make the image from Canvas if the browser supports Data URI.
         */
        Drawing.prototype.makeImage = function () {
            if (this._bIsPainted) {
                _safeSetDataURI.call(this, _onMakeImage);
            }
        };

        /**
         * Return whether the QRCode is painted or not
         *
         * @return {Boolean}
         */
        Drawing.prototype.isPainted = function () {
            return this._bIsPainted;
        };

        /**
         * Clear the QRCode
         */
        Drawing.prototype.clear = function () {
            this._oContext.clearRect(0, 0, this._elCanvas.width, this._elCanvas.height);
            this._bIsPainted = false;
        };

        /**
         * @private
         * @param {Number} nNumber
         */
        Drawing.prototype.round = function (nNumber) {
            if (!nNumber) {
                return nNumber;
            }

            return Math.floor(nNumber * 1000) / 1000;
        };

        return Drawing;
    })();

    /**
     * Get the type by string length
     *
     * @private
     * @param {String} sText
     * @param {Number} nCorrectLevel
     * @return {Number} type
     */
    function _getTypeNumber(sText, nCorrectLevel) {
        var nType = 1;
        var length = _getUTF8Length(sText);

        for (var i = 0, len = QRCodeLimitLength.length; i <= len; i++) {
            var nLimit = 0;

            switch (nCorrectLevel) {
                case QRErrorCorrectLevel.L :
                    nLimit = QRCodeLimitLength[i][0];
                    break;
                case QRErrorCorrectLevel.M :
                    nLimit = QRCodeLimitLength[i][1];
                    break;
                case QRErrorCorrectLevel.Q :
                    nLimit = QRCodeLimitLength[i][2];
                    break;
                case QRErrorCorrectLevel.H :
                    nLimit = QRCodeLimitLength[i][3];
                    break;
            }

            if (length <= nLimit) {
                break;
            } else {
                nType++;
            }
        }

        if (nType > QRCodeLimitLength.length) {
            throw new Error("Too long data");
        }

        return nType;
    }

    function _getUTF8Length(sText) {
        var replacedText = encodeURI(sText).toString().replace(/\%[0-9a-fA-F]{2}/g, 'a');
        return replacedText.length + (replacedText.length != sText ? 3 : 0);
    }

    /**
     * @class QRCode
     * @constructor
     * @example
     * new QRCode(document.getElementById("test"), "http://jindo.dev.naver.com/collie");
     *
     * @example
     * var oQRCode = new QRCode("test", {
     *    text : "http://naver.com",
     *    width : 128,
     *    height : 128
     * });
     *
     * oQRCode.clear(); // Clear the QRCode.
     * oQRCode.makeCode("http://map.naver.com"); // Re-create the QRCode.
     *
     * @param {HTMLElement|String} el target element or 'id' attribute of element.
     * @param {Object|String} vOption
     * @param {String} vOption.text QRCode link data
     * @param {Number} [vOption.width=256]
     * @param {Number} [vOption.height=256]
     * @param {String} [vOption.colorDark="#000000"]
     * @param {String} [vOption.colorLight="#ffffff"]
     * @param {QRCode.CorrectLevel} [vOption.correctLevel=QRCode.CorrectLevel.H] [L|M|Q|H]
     */
    QRCode = function (el, vOption) {
        this._htOption = {
            width : 256,
            height : 256,
            typeNumber : 4,
            colorDark : "#000000",
            colorLight : "#ffffff",
            correctLevel : QRErrorCorrectLevel.H
        };

        if (typeof vOption === 'string') {
            vOption = {
                text : vOption
            };
        }

        // Overwrites options
        if (vOption) {
            for (var i in vOption) {
                this._htOption[i] = vOption[i];
            }
        }

        if (typeof el == "string") {
            el = document.getElementById(el);
        }

        this._android = _getAndroid();
        this._el = el;
        this._oQRCode = null;
        this._oDrawing = new Drawing(this._el, this._htOption);

        if (this._htOption.text) {
            this.makeCode(this._htOption.text);
        }
    };

    /**
     * Make the QRCode
     *
     * @param {String} sText link data
     */
    QRCode.prototype.makeCode = function (sText) {
        this._oQRCode = new QRCodeModel(_getTypeNumber(sText, this._htOption.correctLevel), this._htOption.correctLevel);
        this._oQRCode.addData(sText);
        this._oQRCode.make();
        this._el.title = sText;
        this._oDrawing.draw(this._oQRCode);
        this.makeImage();
    };

    /**
     * Make the Image from Canvas element
     * - It occurs automatically
     * - Android below 3 doesn't support Data-URI spec.
     *
     * @private
     */
    QRCode.prototype.makeImage = function () {
        if (typeof this._oDrawing.makeImage == "function" && (!this._android || this._android >= 3)) {
            this._oDrawing.makeImage();
        }
    };

    /**
     * Clear the QRCode
     */
    QRCode.prototype.clear = function () {
        this._oDrawing.clear();
    };

    /**
     * @name QRCode.CorrectLevel
     */
    QRCode.CorrectLevel = QRErrorCorrectLevel;
})();

var share={
    html:'',
    //初始化分享插件
    init:function(options){
        var style='.share-mask,.share-area,.share-area h3{margin: 0;padding: 0;}.clearfix:after {content: ".";display: block;height: 0;clear: both;visibility: hidden;}.hide {display: none;}.share-mask {position: fixed;left: 0;top: 0;width: 100%;height: 100%;background: rgba(0,0,0,0.5);z-index: 9999;}.share-area {position: fixed;left: 0;bottom: 0;box-sizing: border-box;width: 100%;border-top: 1px solid #DCDCDC;background: #F2F2F2;font-size: 18px;color: #333;transition: height 1s;}.share-area h3 {height: 40px;line-height: 40px;margin-bottom: 2%;text-align: center;}.share-area .share-out {float: left;width: 33.33%;margin-bottom: 4%;text-align: center;font-size: 12px;color: #666;text-decoration: none;}.share-area .share-out b { display: block;width: 35%;margin: 0 auto 5%;background-size: contain !important;}.share-area .share-out b strong {display: block;width: 100%;padding-top: 100%;visibility: hidden;}.share-area .share-out .wb-icon {background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJQAAACVCAIAAAAxAkQmAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAxBpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6RTVFNDYzMjQzQjQ0MTFFNTk0NDk5MDhCRTQ5ODdGOEIiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6RTVFNDYzMjMzQjQ0MTFFNTk0NDk5MDhCRTQ5ODdGOEIiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiBXaW5kb3dzIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9IjA5QUNENzdFODExMjdGRjQxQkM2QkJERjg5QTQzQzA1IiBzdFJlZjpkb2N1bWVudElEPSIwOUFDRDc3RTgxMTI3RkY0MUJDNkJCREY4OUE0M0MwNSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PiyGn30AAFCYSURBVHja7L1nmxxHri4YNm3Zrvb0MnOu2ef8gP3/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") 0 0 no-repeat;}.share-area .share-out .kj-icon {background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJIAAACVCAIAAAA8HDRhAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAxBpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6RTVFNDYzMUMzQjQ0MTFFNTk0NDk5MDhCRTQ5ODdGOEIiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6RTVFNDYzMUIzQjQ0MTFFNTk0NDk5MDhCRTQ5ODdGOEIiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiBXaW5kb3dzIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9IjA5QUNENzdFODExMjdGRjQxQkM2QkJERjg5QTQzQzA1IiBzdFJlZjpkb2N1bWVudElEPSIwOUFDRDc3RTgxMTI3RkY0MUJDNkJCREY4OUE0M0MwNSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PqhiQhcAAEVESURBVHja5L15dyTHkSfo5kccmYmrWDyKh3iJpEiJ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") 0 0 no-repeat;}.share-area .share-out .wm-icon {background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJIAAACWCAIAAAC6iEbPAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAxBpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6RTY1MzlGQUUzQjQ0MTFFNTk0NDk5MDhCRTQ5ODdGOEIiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6RTY1MzlGQUQzQjQ0MTFFNTk0NDk5MDhCRTQ5ODdGOEIiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiBXaW5kb3dzIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9IjA5QUNENzdFODExMjdGRjQxQkM2QkJERjg5QTQzQzA1IiBzdFJlZjpkb2N1bWVudElEPSIwOUFDRDc3RTgxMTI3RkY0MUJDNkJCREY4OUE0M0MwNSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Pt1ID84AAEStSURBVHja7L1ZkxxXlh54V19izUwgsRPFpVisUnVL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") 0 0 no-repeat;}.share-area .cancel {border-top: 1px solid #DCDCDC;height: 45px;line-height: 45px;font-size: 16px;text-align: center;}.qrcode-mask{position: fixed;left: 0;top: 0;width: 100%;height: 100%;background: rgba(0,0,0,0.5);z-index: 10000;}.qrcode-mask .qrcode-box{position: absolute;left: 0;top: 0;right: 0;bottom: 0;margin: auto;width: 200px;height: 210px;background: #FFF;}.qrcode-mask .qrcode-box h3{font-size: 12px;text-align: center;color: #666;}.qrcode-mask .qrcode-box .qrcode{margin-left: 20px;}.qrcode-mask .qrcode-box .qrcode-close{display: block;position: absolute;top: -15px;right: -15px;width: 30px;height: 30px;border: 2px solid #FFF;border-radius: 50%;line-height: 30px;color: #FFF;text-align: center;background:url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAIAAAC0Ujn1AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAxBpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6MTM1MjBCOUM3RUVFMTFFNTgxMjVFQ0Y5MkU0N0Q4RTUiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6MTM1MjBCOUI3RUVFMTFFNTgxMjVFQ0Y5MkU0N0Q4RTUiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiBXaW5kb3dzIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9Ijc2ODMxNTJGNUMzRERFREMwMDlDRTVGOERBMUY3MjQ0IiBzdFJlZjpkb2N1bWVudElEPSI3NjgzMTUyRjVDM0RERURDMDA5Q0U1RjhEQTFGNzI0NCIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PhoPLXIAAAXlSURBVHjajFZNbFRVFD73971589d2CkUEp7Q0TSUqLoiJaJRIYgyJC5WEjQuNRkmMQCq6IlHQldGgC4wmVP5CXLjQGEMCgvwaIS4UiQoFSpGCtNQWKcNM5713POe+mVqBVm9OOq/v3fud7557zncuAICUUmtND8lf0M5EgUwBqIk3YMgCgIAneWQWpKVH4YyHnGzCGFOtVulJaR2FIU8QTW7aFRPxFBpVCGJ+Q38iEFWJQEYjhn8PFCjkxH/sTikVRTy3jt7ooId1PAGd4s8igQ7FVNAEDpOglbYMJxUgJq/SyNyvez7Qe4wgRtq4AAKM6H0oIeYIZCh8UB6TIlQCYudESVGNUYASSsYxz3KhiPij0BrDMI8h/XNNubgLtFKZkNZQ0GLyUCFqFH6ZIzwj43C8RDyNcZur8j6k0BEymuLV5FSIZAvE/d5ONTISafbrxcJEqKpwQwDS8sDoSuRJ9DEaB1qGzSBy7UUvDCulG8QXMAmymHSsNsgSZxDmg02fIJ55+43lPriUMBkIGolANoCMyw0NgeBfD0wa5JzW+5cNXuzt/fWHprxvJWhF58ib0tqyD2MDh+uBsrPnde07feky4serl7bdlE8yScomkIUiwJ0Aqc5HDvTdCEuDG9atoS9WcFYQtGJcmq8VrxDaBA0gDcggc/ei/Wcv49UjPWufSJK+PrUOLZoI9+GW5uOjOIBIuLae+sRaOB7aeMxam1SNtaU9pkE0zJr/4OFz5d8RN699qhWghdKGd9AEXguHyEvbex7ae+Eajv7Y0/00hS6tGddXteqhg2cqlCjkTNiU9LIgKSYZggZvrio+8N35cRw+Ruh16ALIJtDpbEfXrrPD5xC3rF3eDhx7Yp1NMbrRDMlpInXyW/fGR8uHybkFrbPnPnqi7/pgufLuuhWNypU6NEC6fe/RfsSfN65fDtZy3gmY0m4DzelAhFqbi4t+uTCApZ/e6n6SqFnTsu/Y+THEHZtWNvBuNdv/g6bKkr5g7QHlgaRN+oW2rsP9eAnxvQ3vH9/1OY4f3rP5JZAzyHK1QMnb263Q1skac7dZdqDTQefj35ysYAWxNLR/2ytFmmpmEXR+WmjWmbqxokmnb65Oq6DKJopUKEqD5b4Lf/1pIdKli8dHPAS/+kcGhyqsG5TNRji9dZbIcIIO/5QlzaDTssKdmEtUKyg/G7Yeunoe8dPdX53pPYjXTn32+rMZCZRziVH8XAgTSxzUBH4CWjvnSQVn8tAYULal79vx/RWMDu7bsTIPdvZdS7/oxxOIO19bsgAYUjNJkk2iJUWtqPStrOvQKkXQpBkFmLP5wADx3bv95Tsoc3nNfFjwzNcXKeiHtry6OOtNDy2TgvSE5O1ImeHSIIXILdz2bT9Wjh7Z3p3j9ZQtOeCvptjWuXug3Iv40brnZwAffeDVYqxVvZc5IU24s+oqnSLNATETgo6ePWco4Q5uWT0XIMfx4yiRCZ5jzMLH9g/FOHaS0AOfQVMWfDOpTdZbGJP3/CyzFnkIurbu70M89OX2F3JcfzltZzB+sldWKjq8OcW2Jb8N4ijJ05trCFRxd+HYUq2TsBqjatFIWIOwSjZsO3COgkm4LSlwRZFyvPOM6zl0Pud5hF7oWHz09DDi6Dvru61maCp7rerMlWHKymN1Fyq/8cOeOD61c+d6wjK6OTkMq1yuOh1wpZU4K4Bqbl+4ZOjS2bA80jFvVsYjcMp0EmxRawWsgSqpwbTxCqtWLXP3kRwblZDHx6GTzZpEHHz+JMgxaWGhvTjzxedW1C4vibkgU16oeByd0ltALYRIRWVfmhExRu5C7rKuxhClrsRR7YAkXTno2uGuAYEQ1aTRunoG18jdIfIztXeDVVqcisNqlm8I4xUTRokCxA6awhGXwHVWvsZEtbbKUhnRZ5KFSPIjN92YZ6ELQ0DfPDKSXyFgmkHdbOLZuBtC7S53+5HmJkG4nkgL8R/QNHzfv8mHmGK4GjIun4Tn11rJdINucRNkpRtTzfxbgAEAhGDReCdoKZ8AAAAASUVORK5CYII=") 0 0 no-repeat;background-size:contain;overflow:hidden;}';
        $('<style>').text(style).appendTo($('head'));
        if(options.maskLayer||options.maskLayer==undefined){
            share.html+='<div class="share-mask">';
        }
        share.html+='<div class="share-area"><h3>';
        if(options.title){
                share.html+=  options.title+'</h3><div class="clearfix">';
        }else{
                share.html+=  '分享到</h3><div class="clearfix">';
        }
        if(options.shareTo){
            var obj = options.shareTo;
            if(obj.wb){
                var shareWb ='http://v.t.sina.com.cn/share/share.php?';
                if(obj.wb.description){
                    shareWb += 'title='+encodeURIComponent(obj.wb.description);
                }else{
                    shareWb += 'title='+encodeURIComponent("苏宁易购");
                }
                if(obj.wb.url){
                    shareWb += '&url='+encodeURIComponent(obj.wb.url)+'&content=utf-8&sourceUrl='+encodeURIComponent(obj.wb.url);
                }else{
                    shareWb += '&url='+encodeURIComponent("http://m.suning.com/")+'&content=utf-8&sourceUrl='+encodeURIComponent(obj.wb.url);
                }
                if(obj.wb.imgUrl){
                    shareWb += '&pic='+encodeURIComponent(obj.wb.imgUrl);
                }
                share.html+= '<a href="'+shareWb+'" class="share-out share-wb" id="share-wb" target="_blank"><b class="wb-icon"><strong></strong></b>'+obj.wb.type+'</a>';
            }
            if(obj.kj){
                var shareKj ='http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?';
                if(obj.kj.url){
                    shareKj += 'url='+encodeURIComponent(obj.kj.url);
                }else{
                    shareKj += 'url='+encodeURIComponent("http://m.suning.com/");
                }
                if(obj.kj.description){
                    shareKj += '&summary='+encodeURIComponent(obj.kj.description);
                }else{
                    shareKj += '&summary='+encodeURIComponent("苏宁易购");
                }
                if(obj.kj.title){
                    shareKj += '&title='+encodeURIComponent(obj.kj.title);
                }
                if(obj.wb.imgUrl){
                    shareKj += '&pics='+encodeURIComponent(obj.kj.imgUrl);
                }
                share.html+= '<a href="'+shareKj+'" class="share-out share-kj" id="share-kj" target="_blank"><b class="kj-icon"><strong></strong></b>'+obj.kj.type+'</a>';
            }
            if(obj.wm){
                share.html+= '<a href="'+obj.wm.url+'" class="share-out share-wm" id="share-wm" target="_blank"><b class="wm-icon"><strong></strong></b>'+obj.wm.type+'</a>';
            }
            if(obj.fz){
                share.html+= '<a href="'+obj.fz.url+'" class="share-out share-fz" id="share-fz" target="_blank"><b class="fz-icon"><strong></strong></b>'+obj.fz.type+'</a>';
            }
            share.html+= '</div>';
        }
        if(options.needCancel||options.needCancel==undefined){
            share.html+='<div class="cancel">取消</div></div>';
        }else{
            share.html+='</div>';
        }
        if(options.maskLayer||options.maskLayer==undefined){
            share.html+='</div>';
        }
    },
    open:function(){
        var shareArea = $('body').find('.share-area');
        if(shareArea.length){
            $('.share-mask').show();
            $('.share-area').show();
        }else{
            $('body').append(share.html);
        }
    },
    close:function(){
            $('.share-mask').hide();
            $('.share-area').hide();
    }
};

$(function(){
        $('body').on('touchend','.cancel',function(){
            share.close();
        });
        $('body').on('touchend','.share-mask',function(){
            share.close();
        });
        $('body').on('touchend','.share-area',function(){
            share.close();
        });
         $('body').on('touchend','#share-wm',function(e){
            $('body').append($('<div class="qrcode-mask"><div class="qrcode-box"><h3>长按即可保存或者识别二维码</h3><div class="qrcode"><span class="qrcode-close"></span></div></div></div>'))
                var qrcode = new QRCode($(".qrcode").get(0), {
                    width : 160,height : 160
                });
                qrcode.makeCode($(this).attr('href'));
                e.stopPropagation();
                return false;
        });
         $('body').on('touchend','.qrcode-close',function(e){
            //关闭二维码
            $('.qrcode-mask').remove();
        });
         $('body').on('touchend','.share-out',function(e){
            if(!$(this).hasClass('share-wm')){
                window.location.href =$(this).attr('href');
                e.preventDefault();
            }
        });
});





