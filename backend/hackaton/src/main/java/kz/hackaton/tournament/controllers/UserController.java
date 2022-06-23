package kz.hackaton.tournament.controllers;

import kz.hackaton.tournament.dto.UserDto;
import kz.hackaton.tournament.entities.User;
import kz.hackaton.tournament.exceptions.TournamentException;
import kz.hackaton.tournament.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;
import java.util.Optional;

@RestController
@RequestMapping(name = "/user")
@RequiredArgsConstructor
public class UserController {

    private final UserRepository userRepository;

    @GetMapping
    public User getUser(Principal principal) {
        return userRepository.findUserByLogin(principal.getName()).get();
    }

}
