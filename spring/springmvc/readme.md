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