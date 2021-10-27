/**
 * @jest-environment jsdom
 */

import getResult from '../src/js/getResult';

test('Func should return sum of two values', () => {
    expect(getResult("2", "3", "+")).toBe("5");
    expect(getResult("0,53", "5,2", "+")).toBe("5,73")
})

test('Func should return difference between two values', () => {
    expect(getResult("7", "3", "\u2212")).toBe("4");
    expect(getResult("6,53", "5,2", "\u2212")).toBe("1,33");
    expect(getResult("1", "3,555", "\u2212")).toBe("-2,555");
    expect(getResult("0", "3,5", "\u2212")).toBe("-3,5");
    expect(getResult("10", "-3,5", "\u2212")).toBe("13,5");
})

test('Func should return quotient of two values', () => {
    expect(getResult("9", "3", "\u00F7")).toBe("3");
    expect(getResult("10", "3", "\u00F7")).toBe("3,333333333333");
    expect(getResult("2,3", "5,6", "\u00F7")).toBe("0,410714285714");
    expect(getResult("2,3", "0", "\u00F7")).toBe("Error");
    expect(getResult("0", "5,6", "\u00F7")).toBe("0");
})

test('Func should return result of multiply of two values', () => {
    expect(getResult("4", "6", "\u00D7")).toBe("24");
    expect(getResult("3", "-5", "\u00D7")).toBe("-15");
    expect(getResult("1,54", "2,67", "\u00D7")).toBe("4,1118");
    expect(getResult("3", "0", "\u00D7")).toBe("0");
})

test('Func should return result x powered by y', () => {
    expect(getResult("4", "2", "xy")).toBe("16");
    expect(getResult("3", "0", "xy")).toBe("1");
    expect(getResult("2", "1,5", "xy")).toBe("2,828427124746");
    expect(getResult("2", "-3", "xy")).toBe("0,125");
})

test('Func should return the yth root of x', () => {
    expect(getResult("4", "2", "y\u221A")).toBe("2");
    expect(getResult("-4", "2", "y\u221A")).toBe("Error");
    expect(getResult("-4", "3", "y\u221A")).toBe("-1,587401051968");
    expect(getResult("-4", "-2", "y\u221A")).toBe("Error");
    expect(getResult("5", "1,5", "y\u221A")).toBe("2,924017738213");
})

test('Func should return x to the power of 2', () => {
    expect(getResult("3", "", "x2")).toBe("9");
    expect(getResult("-4", "", "x2")).toBe("16");
    expect(getResult("0", "", "x2")).toBe("0");
    expect(getResult("1,5", "", "x2")).toBe("2,25");
})

test('Func should return x to the power of 3', () => {
    expect(getResult("3", "", "x3")).toBe("27");
    expect(getResult("-4", "", "x3")).toBe("-64");
    expect(getResult("0", "", "x3")).toBe("0");
    expect(getResult("1,5", "", "x3")).toBe("3,375");
})

test('Func should return the result of 1 / x', () => {
    expect(getResult("2", "", "1/x")).toBe("0,5");
    expect(getResult("-4", "", "1/x")).toBe("-0,25");
    expect(getResult("0", "", "1/x")).toBe("Error");
    expect(getResult("1,5", "", "1/x")).toBe("0,666666666667");
})

test('Func should return the 2th root of x', () => {
    expect(getResult("4", "", "2\u221A")).toBe("2");
    expect(getResult("0", "", "2\u221A")).toBe("0");
    expect(getResult("-3", "", "2\u221A")).toBe("Error");
    expect(getResult("1,5", "", "2\u221A")).toBe("1,224744871392");
})

test('Func should return the 3th root of x', () => {
    expect(getResult("27", "", "3\u221A")).toBe("3");
    expect(getResult("0", "", "3\u221A")).toBe("0");
    expect(getResult("-8", "", "3\u221A")).toBe("-2");
    expect(getResult("1,5", "", "3\u221A")).toBe("1,144714242553");
})

test('Func should return exp to the power of x', () => {
    expect(getResult("2", "", "ex")).toBe("7,389056098931");
    expect(getResult("0", "", "ex")).toBe("1");
    expect(getResult("-3", "", "ex")).toBe("0,049787068368");
})

test('Func should return 10 to the power of x', () => {
    expect(getResult("2", "", "10x")).toBe("100");
    expect(getResult("0", "", "10x")).toBe("1");
    expect(getResult("-3", "", "10x")).toBe("0,001");
    expect(getResult("15", "", "10x")).toBe("1000000000000000");
})

test('Func should return 2 to the power of x', () => {
    expect(getResult("2", "", "2x")).toBe("4");
    expect(getResult("0", "", "2x")).toBe("1");
    expect(getResult("-3", "", "2x")).toBe("0,125");
    expect(getResult("2,5", "", "2x")).toBe("5,656854249492");
})

test('Func should return ln of x', () => {
    expect(getResult("2", "", "ln")).toBe("0,69314718056");
    expect(getResult("0", "", "ln")).toBe("Error");
    expect(getResult("-3", "", "ln")).toBe("Error");
})

test('Func should return log10 of x', () => {
    expect(getResult("100", "", "log10")).toBe("2");
    expect(getResult("0", "", "log10")).toBe("Error");
    expect(getResult("-3", "", "log10")).toBe("Error");
})

test('Func should return log2 of x', () => {
    expect(getResult("4", "", "log2")).toBe("2");
    expect(getResult("0", "", "log2")).toBe("Error");
    expect(getResult("-3", "", "log2")).toBe("Error");
})