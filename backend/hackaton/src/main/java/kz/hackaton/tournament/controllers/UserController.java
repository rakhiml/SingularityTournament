package kz.hackaton.tournament.controllers;

import kz.hackaton.tournament.dto.UserDto;
import kz.hackaton.tournament.dto.WinnerResult;
import kz.hackaton.tournament.entities.User;
import kz.hackaton.tournament.exceptions.TournamentException;
import kz.hackaton.tournament.repositories.UserRepository;
import kz.hackaton.tournament.responses.ResponseMessage;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.Optional;

@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
public class UserController {

    private final UserRepository userRepository;

    @GetMapping
    public UserDto getUser(Principal principal) {
        User user =  userRepository.findUserByLogin(principal.getName()).get();
        return new UserDto(user.getLogin(), user.getName(), user.getSurname(), user.getMajor());
    }




}
