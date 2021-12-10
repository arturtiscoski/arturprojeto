package br.com.arturprojeto.modulos.config;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
public class ConfigController {

    @RequestMapping(value = "/", method = RequestMethod.GET)
    public String index() throws Exception {
        return "index.html";
    }

}
