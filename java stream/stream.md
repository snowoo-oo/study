# 자바 스트림(Stream)
## 다양한 데이터 소스(컬랙션 배열)를 표준화된 방법으로 다루기 위한것

    컬랙션, 배열 -> Stream -> 중간연산(n번) -> 최종연산(1번)

```java
Stream<T> Collection.stream()

List<Integer> list = Arrays.asList(1,2,3,4,5);
Stream<Integer> intStream = list.stream(); //컬랙션
Stream<String> strStream = Stream.of(new String[]{"a", "b", "c"});//배열 -> 스트림
Stream<Integer> evenStream = Stream.iterate(0, n->n+2); //0,2,4,6,8,....
Stream<Double> randomStream = Stream.generate(Math::random); // 람다식
IntStream intStream = new Random.ints(5); //난수 스트림(크기가 5)
```

```java
String[] strArr = {"aa", "bb", "cc", "dd", "ee"};
Stream<String> stream = Stream.of(strArr); // 문자열 배열이 소스인 스트림
Stream<String> filreredStream = stream.filter(); // 걸러내기 (중간 연산)
Stream<String> distinctedStream = stream.distinct(); // 중복제거(중간 연산)
Stream<String> sortedStream = stream.sort(); // 정렬(중간 연산)
Stream<String> limitedStream = stream.limit(5) // 스트림 자르기(중간 연산)
int total = stream.count(); // 요소 개수 세기 (최종 연산) , 스트림 닫힘
```
---
## 스트림의 특징

   
```java
//스트림은 데이터 소스로부터 데이터를 읽기만할 뿐 변경하지 않는다.
List<Integer> list = Arrays.asList(4,2,6,3,7,4);
List<Integer> sortedList = list.stream().sorted().collect(Collectors.toList());
```

```java
//스트림은 Iterator 처럼 일회용이다. (필요하면 다시 스트림을 생성해야 한다.)
strStream.forEach(System.out::println); //모든 요소 출력(최종연산)
int numerOfStr = strStream.count(); //에러(스트림이 이미 닫혀있음)
``` 

```java
//최종 연산 전까지 중간연산이 수행되지 않는다. - 지연된 연산
IntStram intStream = new Random().ints(1, 46);
intStream.distinct().limit(6).sorted().forEach(i -> System.out.println(i+ ","));
```

```java
//스트림의 작업을 병렬로 처리 - 병렬 스트림
Stream<String> strStream = Stream.of("dd", "aa");
int sum = strStream.parallel() //병렬 스트림으로 전환(속성만 변경)
                    .mapToInt(s -> s.length()).sum();//모든 문자열 길이의 합
```

```java
//기본형 스트림 제공 
IntStream, LongStream, DoubleStream
```
---
## 스트림 만들기

```java
//Collection 인터페이스의 stream()으로 컬렉션을 스트림으로 변환
Stream<T> stream() //Collection 인터페이스 메서드
```

```java
//특정 범위의 정수를 요소로 갖는 스트림 생성
IntStream intStream = IntStream.range(1,5); //1,2,3,4
IntStream intStream = IntStream.rangeClosed(1,5) //1,2,3,4,5
```

```java
//람다식을 소스로 하는 스트림 생성 iterate(T seed,  UnaryOperator f)단항연산자
Stream<Integer> evenStream = Stream.iterate(0, n->n+2); //Stream.iterate(초기값, 람다식)

//generate(Supplier s) : 주기만 하는것 입력 X, 출력 O
Stream<Double> randomStream = Stream.genereate(Math::random); // ()->Math.random(), 초기값이 없음
```

```java
//파일을 소스로 하는 스트림
Stream<Path> Files.list(Path.dir)

Stream<String> Files.lines(Path path)
Stream<String> Files.lines(Path path, Charset cs)
Stream<String> lines() //BufferedReader 클래스 메서드
```

```java
//빈 스트림
Stream emptyStream = Stream.empty()
```
---
## 스트림 연산
```java
//중간 연산
Stream<T> distinct() //중복 제거
Stream<T> filter(Predicate<T> predicate/*조건식*/) //조건에 안 맞는 요소 제외
Stream<T> limit(long maxSize) // maxSize 이후 요소를 잘라낸다
Stream<T> skip(long n) //앞에서 부터 n개 건너뛰기
Stream<T> peek(Consumer<T> action) //스트림의 요소에 작업수행
Stream<T> sorted() //Comparable 으로 기본 정렬
Stream<T> sorted(Comparator<T> comparator) //스트림 요소 정렬

------------sorted 사용방법------------------------
strStream.sorted();
strStream.sorted(Comparator.naturalOrder());
strStream.sorted((s1, s2)-> s1.compareTo(s2));
strStream.sorted(String::compareTo);

strStream.sorted(Comparator.reverseOrder());
strStream.sorted(String.CASE_INSENSITIVE_ORDER); //대소문자 구분안함
strStream.sorted(String.CASE_INSENSITIVE_ORDER.reversed()); //대소문자 구분안함 + 역순정렬
strStream.sorted(Comparator.comparing(String::length)); //길이 순으로 정렬

Comparator 의 comparing()으로 정렬 기준을 제공
studentStream.sorted(Comparator.comparing(Student::getBan))//반별로 정렬

정렬 기준이 여러개 일때 thencomparing() 사용
studentStream.sorted(Comparator.comparing(Student::getBan) //반별로 정렬
                     .thenComparing(Student::getTotalScore) //총점별로 정렬
                     .thenComparing(Student::getName) //이름별로 정렬
                     .최종연산)
--------------------------------------------------

//스트림의 요소를 변환, 어떻게 변환할지 람다식으로
Stream<R> map(Function<T,R> mapper)
IntStream mapToInt(ToIntFunction<T> mapper)
IntStream flatMapToInt(Function<T, IntStream> m)

Stream<T> peek(Consumer<? super T> action) //중간 연산 (스트림 소비 X) 엿보기 기능

Stream<File> fileStream = Stream.of(fileArr);

Stream<String> filenameStream = fileStream.map(File.getName);
                                        .filter(s-> s.indexOf('.') != -1)
                                        .peek(s -> System.out.printf("filename = %s%n", s))
                                        .map(s -> s.substring(s.indexOf('.') + 1))
                                        .peek(s -> System.out.printf("extension=%s%n", s))
                                        .map(String::toUpperCase)
                                        .distinct()
                                        .forEach(System.out::println);

flatMap() //스트림의 스트림을 스트림으로 변환
Stream<String[]> -> Stream<String>
```

```java
//최종 연산
void forEach(Consumer<? super T> action)
void forEachOrdered(Consumer<? super T> action) //순서 유지하면서 처리할때(병렬스트림 이용할때)

long count() //스트림 요소의 개수 반환
Optional<T> max(Comparator<? super T> comparator) //스트림 최대값
Optional<T> min(Comparator<? super T> comparator) //스트림 최소값

Optional<T> findAny() //아무거나 하나 반환 .filter(조건) 이랑 같이 쓰임
Optional<T> findFirst() //첫 번째 요소 반환 .filter(조건) 이랑 같이 쓰임

boolean allMatch(Predicate<T> p) //모두 만족하는지
boolean anyMatch(Predicate<T> p) //하나라도 만족하는지
boolean noneMatch(Predicate<T> p) //모두 만족하지 않는지

Object[] toArray() //Object 배열 리턴
A[] toArray(generator) //generator 배열 리턴

**핵심
Optional<T> reduce<BinaryOperator<T> accumulator> //스트림의 요소를 하나씩 줄여가면서(리듀싱) 계산한다.

R collect(Collector<T,A,R> collector) //스트림의 요소를 수집한다.
//주로 요소를 그룹화하거나 분할한 결과를 컬랙션에 담아 반환하는데 사용된다.
```
---

```java
//T Type Object 래퍼 클래스 Optional<T>
//모든 종류의 객체 저장
//1. null을 직접 다루는것은 위험 (NullPointerException 발생가능) -> null을 객체에 담아서 다루기 위해서
//2. null 체크를 안해도된다.

생성
String str = "abc"
Optional<String> optval = Optional.of(str);
Optional<String> optval = Optional.of("abc")
Optional<String> optval = Optional.of(null); // NullPointerException 발생!!
Optional<String> optval = Optional.ofNullable(null);

값 가져오기
String str1 = optval.get(); //optval 저장된 값 반환. null일때 예외 발생
String str2 = optval.orElse("") // optval 저장된 값 반환. null일때는 ""반환
String str3 = optval.orElseGet(String::new) // ()-> new String()
String str4 = optval.orElseThrow(NullPointerException::new);// null이면 예외발생

```