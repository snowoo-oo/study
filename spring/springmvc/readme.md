**Servlet**
<details>
<summary>1. 스프링 부트 서블릿 환경 구성</summary>

```java
    //hello.servlet.ServletApplication ->
    @ServletComponentScan //서플릿 자동 등록
    @SpringBootApplication
    public class ServletApplication{
        main...
    }
    
```
</details>


<details>
<summary>2. 서블릿 등록하기</summary>

```java
    //name : 서블릿 컴포넌트 등록 이름 (유일해야함!)
    //urlPatterns : 요청 url 경로
    @WebServlet(name = "helloServlet", urlPatterns = "/hello")
    //HttpServlet를 확장해야함
    public class HelloServlet extends HttpServlet{
        
        //protected service method를 오버라이딩해야함
        @Override
        protected void service(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException{
            String username = request.getParameter("username");
            System.out.println("username = " + username);
        //응답 Http 헤더 설정
        response.setContentType("text/plain");
        response.setCharacterEncoding("utf-8");
        //String 으로 반환
        response.getWriter().write("hello " + username);
        }
    }
```
</details>

<details>
<summary>3. 데이터 전달 세가지 방법1(GET-쿼리 파라미터)</summary>

```java
    //전체 파라미터 조회
    request.getPrameterNames().asIterator()
            .forEachRemaining(paramName -> System.out.println(paramName + "=" + request.getParamter(paramName)));
    
    //단일 파라미터 조회
    String username = request.getParameter("username");
    int age = Integer.parseInt(request.getParameter("age"));
```
</details>

<details>
<summary>4. 데이터 전달 세가지 방법2(POST-HTML Form))</summary>

```java
    //content-type: application/x-www-form-urlencoded
    ServletInputStream inputStream = request.getInputStream();
    String messageBody = StreamUtils.copyToString(inputStream, StandardCharsets.UTF-8);
```
</details>

<details>
<summary>5. 데이터 전달 세가지 방법3(HTTP message body)</summary>

```java
    //content-type: application/json
    //Spring MVC가 제공하는 JSON 결과 ->객체 ,라이브러리
    private ObjectMapper objectMapper = new ObjectMapper();
    ServletInputStream inputStream = request.getInputStream();
    String messageBody = StreamUtils.copyToString(inputStream, StandardCharsets.UTF-8);

    HelloData helloData = objectMapper.readValue(messageBody, HelloData.class);

    System.out.println("helloData.username = " + helloData.getUsername());
    System.out.println("helloData.age = " + helloData.getAge());
```
</details>

<details>
<summary>6. HttpServletResponse 기본 사용법</summary>

```java
    response.setStatus(HttpServletResponse.SC_OK);//200
    response.setHeader("Content-Type", "text/plain;charset=utf-8");
    response.setHeader("key", "value");

    response.setContentType("text/plain");
    response.setCharacterEnCoding("utf-8");

    Cookie cookie = new Cookie("myCookie", "good");
    cookie.setMaxAge(600);
    response.addCookie(cookie);

    //html 응답
    response.sendRedirect("/basic/hello-form.html");

    //message body 응답
    PrintWriter writer = response.getWriter();
    writer.println("/ok)


```
</details>

<details>
<summary>7. 데이터 응답 세가지 방법1(텍스트)</summary>

```java
    //Content-Type: text/html;charset=utf-8
    response.setContentType("text/html");
    response.setCharacterEncoding("utf-8");

    //어차피 text로 전달되기 때문에 html형식으로
    //응답하면 html이 되는것이고
    //"ok"와같은 텍스트로 응답하면 텍스트 그대로 전달된다.
    PrintWriter writer = response.getWriter();
    writer.println("<html>");
    writer.println("<body>");
    writer.println(" <div>안녕?</div>");
    writer.println("</body>");
    writer.println("</html>");
```
</details>

<details>
<summary>9. 데이터 응답 세가지 방법3(HTTP API, MessageBody JSON 응답)</summary>

```java
    ObjectMapper objectMapper = new ObjectMapper();

    //Content-Type: application/json
    response.etHeader("content-type", "application/json");
    response.setCharacterEncoding("utf-8");

    HelloData data = new HelloData();
    data.setUsername("kim");
    data.setAge(20);

    String result = objectMapper.writeValueAsString(data);

    response.getWriter().wirte(result);
    //여기도 마찬가지로 HelloData 를 objectMapper를 이용해 String으로 바꿔서 전달한다.
```
</details>

---

**스프링 MVC 기본기능**
<details>
    <summary>1. 로깅 기능</summary>
    slf4j / logback 사용

    - 로그 레벨 설정(application.properties)
        
        #전체 로그 레벨 설정(기본 info)
        logging.level.root=info

        #hello.springmvc 패키지와 그 하위 로그 레벨 설정
        logging.level.hello.springmvc=debug
        
    - 올바른 로그 사용법
        log.debug("data = {}", data);

    - 로그 레벨
        trace < debug < info < warn < error
</details>

<details>
    <summary>2. 요청 매핑</summary>

```java
    @RestController
    public class MappingController{
        @RequestMapping("hello-basic")
        public String helloBasic(){
            return "ok";
        }
    }


    @RestController
    //@Controller는 반환 값이 String이면 뷰 이름으로 인식된다.
    //그래서 뷰를 찾고 뷰가 랜더링 된다.

    //@RestController는 반환 값으로 뷰를 찾는 것이 아니라, HTTP 메시지 바디에 바로 입력한다.
    //따라서 실행 결과로 ok메세지를 받을 수 있다.

    @RequestMapping("/hello-basic")
    // /hello-basic URL 호출이 오면 이 메서드가 실행되도록 매핑한다.

    @GetMapping("/maping/{userId}")
    public String mappingPath(@PathVariable("userId") String data){
        log.info("mappingPath userId = {}", data);
        return "ok";
    }

    @GetMapping("/mapping/users/{userId}/orders/{orderId}")
    public String mappingPath(@Pathvariable String userId, @PathVariable Long orderId){
        //userId 로 넘어온값은 userId 변수이름으로 생성하여
        //사용하면 ("userId")를 생략 할 수 있다.
        log.info("userId = {}, orderId = {}", userId, orderId);
        return "ok";
    }

    - 미디어 타입 조건 매핑
        @PostMapping(value="/mapping-consume", consumes = "application/json")
        public String mappingConsumes(){
            log.ingo("mappingConsumes");
            return "ok";
        }

```
</details>

<details>
    <summary>3. 요청 매핑 - API 예시</summary>

    회원관리 API

        - 회원 목록 조회 : GET /users
        - 회원 등록 :      POST /users
        - 회원 조회 :      GET /users/{userId}
        - 회원 수정 :      PATCH /users/{userId}
        - 회원 수정 :      DELETE /users/{userId}
  
```java
    @RestController
    @RequestMapping("/mapping/users") // 클래스 레벨에 매핑정보를 추가하면
    //클래스 레벨 매핑 + 메서드 레벨 매핑 -> result mapping 결과 처리
    public class MappingClassController{
        
        @GetMapping
        public String users(){
            return "get users";
        }

        @PostMapping
        public String addUsers(){
            return "post users"
        }

        @GetMapping("/{userId}")
        public String findUser(@PathVariable String userId){
            return "get userId = " + userId;
        }

        @PatchMapping("/{userId}")
        public String updateUser(@PathVariable String userId){
            return "update userId = " + userId;
        }

        @DeleteMapping("/{userId}")
        public String delteUser(@PathVariable String userId){
            return "delete userId = " + userId;
        }
    }


```
</details>

<details>
    <summary>4. 데이터 전송 방식의 진화</summary>

```java
    @Slf4j
    @Controller
    public class RequestParamController{

        /**
        * 반환 타입이 없으면서 이렇게 응답에 값을 직접 집어넣으면, view 조회X
        */
        @RequestMapping("/request-param-v1")
        public void requestParamV1(HttpServletRequest request, HttpServletResponse response) throws IOException{
            String username = request.getParameter("username");
            int age = Integer.parseInt(request.getParameter("age"));
            log.info("username={}, age={}", username, age);

            response.getWriter().write("ok");
        }

        @ResponseBody //View 조회 무시하고, HTTP message body에 직접 내용 입력
        @RequestMapping("/request-param-v2") //파라미터 이름으로 바인딩
        public String requestParamV2(
            @RequestParam("username") String memberName,
            @RequestParam("age") int memberAge){
            log.info("username = {}, age = {}", memberName, memberAge);
            return "ok";
        }
        

        @ResponseBody
        @RequestMapping("/request-param-v3")
        public String requestParamV3(
                @RequestParam String username,
                @RequestParam int age){
            log.info("username = {}, age = {}", username, age);
            return "ok";
        }
        
        @ResponseBody
        @RequestMapping("/request-param-v4")
        //String, int, Integer... 단순 타입이면 @RequestParam 생략 가능
        public String requestParamV4(String username, int age){
            log.info("username = {}, age = {}", username, age);
            return "ok";
        }

        //파라미터 필수여부
        @ResponseBody
        @RequestMapping("/request-param-required")
        public String requestParamRequired(
                @RequestParam(required = true) String username,
                @RequestParam(required = false) int age){
            log.info("username = {}, age = {}", username, age);
            return "ok";
                }

        //default 값 적용
        @RequestParam(defaultValue = "default") String name

        //파라미터를 Map으로 조회하기
        //이떄 key -> value 가 1:1대응이 아니면
        //MultiValueMap 을 사용하자
        @ResonseBody
        @RequestMapping("/request-param-map")
        public String requestParamMap(@RequestParam Map<String, Object> paramMap){
            log.info("username={}, age={}", paramMap.get("username"),paramMap.get("age"));
            return "ok";
        }
    }
```
</details>

<details>
    <summary>5. HTTP 요청 파라미터 - @ModelAttribute</summary>

    
```java
다음과 같은 작업을 자동화해주는 기능
    @RequestParam String username;
    @RequestParam int age;

    MyUser user = new MyUser(username, age);
```

```java
@ModelAttribute 적용 - modelAttributeV1
    @ResponseBody
    @RequestMapping("/model-attribute-v1")
    public String modelAttributeV1(@ModelAttribute MyUser myUser){
        log.info("username = {}, age = {}", myUser.getUsername(), myUser.getAge());
        return "ok";
    }
```

```java
@ModelAttribute 생략 - modelAttributeV2
    @ResponseBody
    @RequestMapping("/model-attribute-v2")
    public String modelAttributeV2(MyUser myUser){
        log.info("username = {}, age = {}", myUser.getUsername(), myUser.getAge());
        return "ok";
    }
```

    @ModelAttribute 와 @RequestParam 모두 생략 가능
    - String, int, Integer 같은 단순 타입 -> @RequestParam
    - 나머지 -> @ModelAttribute
  
</details>

<details>
    <summary>6. HTTP 요청 메세지 - 단순 텍스트</summary>

```java
Servlet 이용 방법
    @PostMapping("/request-body-string-v1")
    public void requestBodyString(HttpServletRequest request, HttpServletResponse response) throws IOException{
        ServletInputStream inputStream = request.getInputStream();
        String messageBody = StreamUtils.copyToString(inputStream, StandardCharsets.UTF_8);

        log.info("messageBody = {}", messageBody);

        response.getWriter().write("ok");
    }
```

```java
- InputStream(Reader): HTTP 요청 메시지 바디의 내용을 직접 조회
- OutputStream(Writer) : HTTP 응답 메시지의 바디에 직접 결과 출력

    @PostMapping("/request-body-string-v2")
    public void requestBodyStringV2(InputStream inputStream, Writer responseWriter) throws IOException{
        String messageBody = StreamUtils.copyToString(inputStream, StandardCharsets.UTF_8);
        log.info("messageBody = {}", messageBody);
        responseWriter.write("ok");
    }
```

```java
HttpEntity 이용 방법
    /**
    * HTTpEntity: HTTP header, body 정보를 편리하게 조회
    * - 메시지 바디 정보를 직접 조회 
    * - HttpMessageConverter 사용 -> StringHttpMessageConverter 적용
    */
    @PostMapping("/request-body-string-v3")
    public HttpEntity<String> requestBodyStringV3(HttpEntity<String> httpEntity){
        String messageBody = httpEntity.getBody();
        log.info("messageBody = {}", messageBody);

        return new HttpEntity<>("ok");
    }
```

```java
@RequestBody 이용 방법
    /**
    @RequestBody 바디 메세지를 직접 조회
    @ResponseBody 바디 메세지를 직접 반환
    */
    @ResponseBody
    @PostMapping("/request-body-string-v4")
    public String requestBodyStringV4(@RequestBody String messageBody){
        log.info("messageBody={}", messageBody);
 return "ok";
    }
```
</details>

<details>
    <summary>6. HTTP 요청 메세지 - JSON </summary>

```java
servlet 형식
    private ObjectMapper objectMapper = new ObjectMapper();

    @PostMapping("/request-body-json-v1")
    public void requestBodyJsonV1(HttpServletRequest request, HttpServletResponse response) throw IOException{
        ServletInputStream inputStream = request.getInputStream();
        String messageBody = StreamUtils.copyToString(inputStream,StandardCharsets.UTF_8);
        log.info("messageBody={}", messageBody);
        HelloData data = objectMapper.readValue(messageBody, HelloData.class);
        log.info("username={}, age={}", data.getUsername(), data.getAge());
        response.getWriter().write("ok");
    }
```

```java
@RequestBody + ObjectMapper

    private ObjectMapper objectMapper = new ObjectMapper();

    @ResponseBody
    @PostMapping("/request-body-json-v2")
    public String requestBodyJsonV2(@RequestBody String messageBody) throws IOException{
        MyUser data = objectMapper.readValue(messageBody, MyUser.class);

        log.info("username={}, age={}", data.getUsername(), data.getAge());
 return "ok";
    }
```

```java
@RequestBody 사용방법

    @ResponseBody
    @PostMapping("/request-body-json-v3")
    public String requestBodyJsonV3(@RequestBody MyUser data) {
    log.info("username={}, age={}", data.getUsername(), data.getAge());
    return "ok";
}
```

```java
@RequestBody + 객체 반환
    @ResponseBody
    @PostMapping("/request-body-json-v5")
    public MyUser requestBodyJsonV5(@RequstBody MyUser data){
        log.info("username={}, age={}", data.getUsername(), data.getAge());
        return data;
    }
```
</details>

<details>
    <summary>7. HTTP 응답 - 뷰 템플릿</summary>

```java
    @RequestMapping("/response-view-v1")
    public ModelAndView responseViewV1(){
        ModelAndView mav = new ModelAndView("response/hello").addObject("data", "hello!!");

        return mav;
    }
```

```java
    @RequestMapping("/response-view-v2")
    public String responseViewV2(Model model){
        model.addAttribute("data", "hello !!");
        return "response/hello";
    }
```

```java
    @RequsetMapping("/response/hello")
    public void responseViewV3(Model model){
        model.addAttribute("data", "hello");
    }
```
</details>

<details>
    <summary>8. HTTP 응답 - 정적 리소스, 뷰 템플릿</summary>

    - 정적 리소스 : 웹브라우저에 정적인 HTML, css, js를 제공할때
  
    - 뷰 템플릿 : 웹브라우저에 동적인 HTML을 제공할때

    - HTTP 메시지 : HTTP API를 제공하는 경우

</details>

<details>
    <summary>9. HTTP 응답 - HTTP API</summary>

```java
HttpServletResponse 이용

    @GetMapping("/resonse-body-string-v1")
    public void responseBodyV1(HttpServletResponse resonse) throws IOException{
        response.getWriter().write("ok");
    }
```

```java
ResponseEntity 이용

    @GetMapping("/response-body-string-v2")
    public ResponseEntity<String> responseBodyV2(){
        return new ResponseEntity<>("ok", HttpStatus.OK);
    }
```

```java
@ResponseBody 이용

    @ResponseBody
    @GetMapping("/response-body-string-v3")
    public String responseBodyV3(){
        return "ok";
    }
```

```java
ResponseEntity<>를 이용한 JSON 반환

    @GetMapping("/response-json-v1")
    public ResponseEntity<MyUser> responseBodyJsonV1(){
        MyUser myUser = new MyUser("userA", 10);)
        return new ResponseEntity<>(myUser, HttpStatus.OK);
    }
```

```java
가장 최신 방법

    @ResponseStatus(HttpStatus.OK)
    @ResponseBody
    @GetMapping("/response-body-json-v2")
    public MyUser responseBodyJsonV2(){
        return new MyUser("userA", 20);
    }
```

    @RestController
    @Controller 대신에 @RestController를 사용하면, 해당 컨트롤러가 모두 @ResponseBody가 적용되는 효과가 있다
    따라서 REST API (HTTP API)를 만들 떄 사용하는 컨트롤러 이다.
</details>

---
**Item Service web serivce 만들기**
<details>
    <summary>1. 프로젝트 생성</summary>

    Gradle Project / Java / Spring Boot recent version / 
    Group : hello / Artifact : item-service / Pacakge name : hello.itemservice /
    Packaging : Jar / Java 11

    Dependencies : Spring Web, Thymeleaf, Lombok

</details>

<details>
    <summary>2. 요구사항 분석</summary>

    - 상품 리스트 / 상품 상세 / 상품 추가 / 상품 수정

</details>

<details>
    <summary>3. 상품 도메인 개발</summary>

```java
Item - 상품 객체

@Getter @Setter
public class Item{
    private Long id;
    private String itemName;
    private Integer price;
    private Integer quantity;
}

+ 생성자 
```

```java
ItemRepository

@Repository
public class ItemRepository{
    private static final Map<Long, Item> store = new HashMap<>();
    private static long sequence = 0L;

    public Item save(Item item){
        item.setId(++sequence);
        store.put(item.getId(), item);
        return item;
    }

    public List<Item> findAll(){
        return new ArrayList<>(store.values());
    }

    public Item findById(Long id){
        return store.get(id);
    }

    public void update(Long itemId, Item updateParam){
        Item item = findById(itemId);
        item.setItemName(updateParam.getItemName());
        item.setPrice(updateParam.getPrice());
        item.setQuantity(updateParam.getQuantity());
    }

    public void clearStore(){
        store.clear();
    }
}

repository 생성 후 test / junit5 해볼것. 코드 참조
```

</details>

<details>
    <summary>4. 컨트롤러 / 뷰 템플릿</summary>

```java
BasicItemController

    @Controller
    @RequestMapping("/basic/items")
    @RequiredArgsConstructor    //final 붙은 멤버변수만 사용해서 생성자를 자동으로 만들어준다.
    public class BasicItemController{

        private final ItemRepository itemRepository;

        /**
        * 회원 리스트 전체를 보여주는 메소드
        * model 에 회원전체를 담아서 담고 뷰가 참조하도록 한다.
        * /template/basic/items.html이 thymeleaf에 의해서 참조 된다.
        */
        @GetMapping
        public String items(Model model){
            List<Item> items = itemRepository.findAll();
            model.addAttribute("items", items);
            return "basic/items";
        }

        /**
        * 해당 빈의 의존관계가 모두 주입되고 나면 초기화 용도로 호출된다.
        */
        @PostConstruct
        public void init(){
            itemRepository.save(new Item("itemA", 10000, 100));
            itemRepository.save(new Item("itemB", 20000, 200));
        }

        /**
        * 해당 아이템의 상세화면을 조회한다. item을 model에 담아서 view에서 참조하도록 설계
        */
        @GetMapping("{itemId}")
        public String item(@PathVariable Long itemId, Model model){
            Item item = itemRepository.findById(itemId);
            model.addAttribute("item", item);
            return "basic/item";
        }

        /**
        * 상품 등록폼 / 아무데이터없는 폼 호출
        */
        @GetMapping("/add")
        public String addForm(){
            return "basic/addForm";
        }

        /**
        * 상품 수정 폼 전달
        */
        @GetMapping("/{itemId}/edit")
        public String editForm(@pathVariable Long itemId, Model model){
            Item item = itemRepository.findById(itemId);
            model.addAttribute("item", item);
            return "basic/editForm";
        }

        /**
        * 상품 수정하기
        */
        @PostMapping("/{itemId}/edit")
        public String edit(@PathVariable Long itemId, @ModelAttribute Item item){
            itemRepository.update(itemId, item);
            return "redirect:/basic/items/{itemId}";
        }
    }

```

```
thymeleaf
    - 행심은 th:xxx가 붙은 부분은 서버사이드에서 렌더링 되고, 기존 것을 대체한다.
        th:xxx이 없으면 기존 html의 xxx속석이 그대로 사용된다.

    - 순서 HTML을 그대로 유지하면서 뷰 템플릿도 사용할 수 있는 타임리프의 특징을 네츄럴 템플릿이라 한다.
```

```
    <html xmlns:th="http://www.thymeleaf.org">
    <head>
        ...
        <link th:href="@{/css/bootstrap.min.css}">
    </head>
    <body>

    //상품 등록 버튼
    <button th:onclick="|location.href='@{/basic/items/add}'|">상품 등록</button>

    //상품 목록 반복
    <tr th:each="item : ${items}>
        <td><a th:href="@{|/basic/items/${item.id}|}" th:text=${item.id}>상품 ID</a></td>
        <td><a th:href="@{|/basic/items/${item.id}|}" th:text=${item.itemName}>상품명</a></td>
    </tr>
    </body>
    </html>
```
</details>

<details>
    <summary>5. 상품 추가</summary>

```java
@RequestParam으로 받아서 Model에 전달

    @PostMapping("/add")
    public String addItemV1(@RequestParam String itemName,
                            @RequestParam int price,
                            @RequestParam Integer quantity,
                            Model model){

        Item item = new Item(itemName, price, quantity);
        itemRepository.save(item);
        model.addAttribute("item", item);
        return "basic/item";
    }
```

```java
@ModelAttribute로 받기

    @PostMapping("/add")
    public String addItemV2(@ModelAttribute("item") Item item){

        itemRepository.save(item);
        return "basic/item";
    }
```

```java
이름 속성 생략

    @PostMapping("/add")
    public String addItemV3(@ModelAttribute Item item){

        itemRepository.save(item);
        return "basic/item";
    }
```

```java
@ModelAttrubute 생략

    @PostMapping("/add")
    public String addItemV4(Item item){

        itemRepository.save(item);
        return "basic/item";
    }
```
      
```java
##RedirectAttributes 적용

    @PostMapping("/add")
    public String addItemV5(Item item, RedirectAttributes redirectAttributes){
        Item savedItem = itemRepository.save(item);
        redirectAttributes.addAttribute("itemId", savedItem.getId());
        redirectAttributes.addAttribute("status", true);
        return "redirect:/basic/items/{itemId}";
    }
```
</details>
