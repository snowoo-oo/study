﻿using System.ComponentModel.DataAnnotations;

namespace NetCoreWeb.Models
{
    public class LoginInfo
    {

        [Required(ErrorMessage ="사용자 아이디를 입력하세요.")]
        [MinLength(6, ErrorMessage ="사용자 아이디를 최소 6자 이상 입력하세요.")]
        [Display(Name="사용자 아이디")]
        public string UserId { get; set; }

        [Required(ErrorMessage ="비밀번호를 입력하세요.")]
        [MinLength(6, ErrorMessage = "비빌번호를 최소 6자 이상 입력하세요.")]
        [Display(Name="비밀번호")]
        public string Password { get; set; }
    }
}
