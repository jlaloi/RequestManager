package fr.jlaloi.requestmanager;

import fr.jlaloi.requestmanager.domain.Role;
import fr.jlaloi.requestmanager.domain.User;
import fr.jlaloi.requestmanager.domain.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;
import java.util.Collection;

/**
 * Created by julien on 20/11/15.
 */
@RestController
public class RestServices {

    @Autowired
    private UserRepository userRepository;

    @RequestMapping("/logged")
    public Principal user(Principal user) {
        return user;
    }

    @RequestMapping("/roles")
    public Collection<? extends GrantedAuthority> roles(Principal principal) {
        User user = userRepository.findByUsername(principal.getName());
        return user.getAuthorities();
    }

}