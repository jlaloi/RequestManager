package fr.jlaloi.requestmanager;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

/**
 * Created by julien on 20/11/15.
 */
@RestController
public class RestServices {

    @RequestMapping("/logged")
    public Principal user(Principal user) {
        return user;
    }

}