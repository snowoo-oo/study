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
```
</details>
