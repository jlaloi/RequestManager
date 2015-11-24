package fr.jlaloi.requestmanager.security;

import fr.jlaloi.requestmanager.domain.Role;
import fr.jlaloi.requestmanager.domain.User;
import fr.jlaloi.requestmanager.domain.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by julien on 22/11/15.
 */
@Component
@Service
public class UserDetailsServiceImpl implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String s) throws UsernameNotFoundException {
        //@TODO To be removed!
        createDefaultAdmin();
        User user = userRepository.findByUsername(s);
        if(user == null){
            throw new UsernameNotFoundException("User Not Found");
        }
        return user;
    }

    private void createDefaultAdmin() {
        String adminUsername = "admin";
        User user = userRepository.findByUsername(adminUsername);
        /*if(user != null){
            userRepository.delete(user);
            user = null;
        }*/
        if (user == null) {
            System.out.println("Admin need to be created");
            User admin = new User();
            admin.setUsername(adminUsername);
            admin.setPassword(adminUsername);
            admin.setFirstName("The");
            admin.setLastName(adminUsername);
            admin.setEnabled(true);
            List<Role> roles = new ArrayList<Role>();
            roles.add(Role.ADMIN);
            admin.setAuthorities(roles);
            userRepository.save(admin);
            System.out.println("Admin created!");
        }
    }
}
