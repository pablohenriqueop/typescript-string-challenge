export type Override<Source, New> = Omit<Source, keyof New> & New;

type StartsWith<
  Source extends string,
  Test extends string
> = Source extends `${Test}${string}` ? true : false;

type EndsWith<
  Source extends string,
  Test extends string
> = Source extends `${string}${Test}` ? true : false;

type ToArray<T extends string> = T extends `${infer C}${infer Rest}`
  ? [C, ...ToArray<Rest>]
  : [];

type Split<
  T extends string,
  S extends string
> = T extends `${infer C}${S}${infer Rest}` ? [C, ...Split<Rest, S>] : [T];

type Concat<S extends string, Args extends string[]> = Args extends [
  infer First,
  ...infer Rest
]
  ? First extends string
    ? Rest extends string[]
      ? Concat<`${S}${First}`, Rest>
      : S
    : S
  : S;

type ImplString<Source extends string> = {
  length: ToArray<Source>["length"];
  charAt: <N extends number>(n: N) => ToArray<Source>[N];
  split: <N extends string>(n: N) => Split<Source, N>;
  startsWith: <StringToTest extends string>(
    s: StringToTest
  ) => StartsWith<Source, StringToTest>;
  endsWith: <StringToTest extends string>(
    s: StringToTest
  ) => EndsWith<Source, StringToTest>;
  concat: <Args extends Array<string>>(...x: Args) => Concat<Source, Args>;
  toUpperCase: () => Uppercase<Source>;
  toLocaleUpperCase: <S extends string>(s: S) => Uppercase<S>,
  toLowerCase: () => Lowercase<Source>;
  toLocaleLowerCase: <S extends string>(s: S) => Lowercase<S>,
  includes: <StringToTest extends string>(s: StringToTest) => Source extends `${string}${StringToTest}${string}` ? true : false;
};

interface Strings<T extends string> extends Override<String, ImplString<T>> {}

const strings = <T extends string>(string: T) =>
  string as unknown as Strings<T>;

const name = strings("O rato");

const StartsWith = name.startsWith("Men");
const EndsWith = name.endsWith("ria");
const firstChar = name.charAt(2);
const len = name.length;
const split = name.split(" ");
const concat = name.concat(" morreu");

const locale = name.toLocaleLowerCase("pt-BR");
const includes = name.includes("O")