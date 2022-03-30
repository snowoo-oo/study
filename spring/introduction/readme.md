<details>
  <summary>스프링 웹개발의 3가지 방법</summary>

```java
  //0. thymeleaf 사용방법
  //#ooo.html
  //    <html xmlns:th="http://www.thymeleaf.org">
  //    ...
  //    <p th:text="`thymeleaf사용방법 : ${data}`">고정 글</p>

  @Controller
  public class SomeController{

      @GetMapping("/hello")
      public String hello(Model model){
          model.addAttribute("data", "text~~");

          return "hello";
      }
  //    
  //    #1. @GetMapping("/hello")
  //        localhost:8080/hello 경로로 들어오면 실행하도록 설정
  //    #2. model.addAttribute("data", "text~~");
  //        model에 "data"라는 이름으로 'text~~" 전달
  //    #3. return "hello"
  //        hello.html에 model 전달하면서 hello.html 실행
  //        이때 hello.html에서 model받아서 ${"data"}를 text~~로 랜더링작업       

  }

  //1. 스프링 웹 개발의 3가지 방법
  //    1.1. 정적 컨텐츠
  //    1.2. MVC와 template 엔진
            @GetMapping("hello-mvc")
            public String helloMvc(@RequestParam("name") String name, Model model){
                model.addAttribute("name", name);
                return "hello-template";
            }

    //        #1. @GetMapping("hello-mvc") 
    //            url 경로를 localhost:8080/hello-mvc 로 요청받았을때 실행 get방식
    //        #2. @RequestParam("name") String name, Model model 
    //            localhost:8080/hello-mvc?name=something 으로 받아서 name 변수에 저장하는 기능
    //            @RequestParam("name", required=true) 이 기능은 default로 true로 설정되어있어서 만약 사용하지 않는경우에는 false로 설정한다.
    //        #3. model.addAttribute("name", name);
    //            model에 name변수를 "name"이라는 이름으로 담는다
    //        #4. return "hello-tempalte";
    //            template 폴더에 hello-template.html에 모델을 전달하면서 실행시킨다.

    //    1.3. API
            @GetMapping("hello-string")
            @ResponseBody
            public String helloString(@RequestParam("name") String name){
                return "hello " + name;
            }

    //        #1 @GetMapping("hello-string")
    //                url localhost:8080/hello-string 로 요청받았을때 실행
    //            #2 @ResponseBody    
    //                응답데이터를 http 프로토콜에 body부분에 직접 넣어주겠다.
    //                view가 없고 문자 그대로 전달한다.

    //        일반적인 API 사용방식
            @GetMapping("hello-api")
            @ResponseBody
            public Hello helloApi(@RequestParam("name") String name){
                Hello hello = new Hello();
                hello.setName(name);
                return hello;
            }

            static class Hello{
                private String name;

                public void setName(String name){
                    this.name = name;
                }

                public String getName(){
                    return this.name;
                }
            }
    //helloController -> return hello -> HttpMessageConverter(JsonConverter, StringConverter) -> (to client) {name : spring} 전달
```
</details>

<details>
    <summary>백엔드 개발</summary>

```java
//controller : web mvc에서 controller 역할
//service : 핵심 비즈니스 로직 구현
//repository : db에 접근, 도메인 객체를 db에 저장 관리
//domain : 비즈니스 도메인 객체 (회원, 주문, 쿠폰...)주로 DB에 저장하고 관리됨

//package domain Member.class 생성
//package repository MemberRepository 인터페이스 생성
//  findById / findByName은 Optional<Member> 반환
//  Optional 은 Null 예외 처리 용이함
    @Override
    public Optional<Member> findById(Long id){
        return Optional.ofNullable(store.get(id));
    }

    @Override
    public Optional<Member> findByName(String name){
        return store.values().stream()
        .filter(member -> member.getName().equals(name))
        .findAny();
    }
//package repository MemoryMemberRepository 생성
//package service MemberService.class 생성
//    - dependency injection (생성자 주입)
    public Long join(Member member){
        validateDuplicateMember(member);
        memberRepository.save(member);
        return member.getId();
    }    

    private void validateDuplicateMember(Member member){
        memberRepository.findByName(member.getName())
                .ifPresent(m ->{
                    throw new IllegalStateException("이미 존재하는 회원입니다.");
                });
    }
```

</details>

<details>
    <summary>스프링 빈 등록 방법</summary>

    스프링 컨테이너

    ```mermaid
        graph LR;
        A[memberControll] --> B[memberService] -- C[memberRepository];
    ```

```java
//1. 컴포넌트 스캔과 자동 의존관계 설정
//클래스 -> @Service, @Repository, @Controller, 생성자 -> @AutoWired

//2. 자바코드로 직접 스프링 빈 등록하기
@Configuration
public class SpringConfig{
    @Bean
    public MemberService memberSerice(){
        return new MemberService(memberRepository());
    }

    @Bean
    public MemberRepository memberRepository(){
        return new MemoryMemberRepository();
    }
}
```
</details>
