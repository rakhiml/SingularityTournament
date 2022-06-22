package kz.hackaton.tournament.controllers;

import kz.hackaton.tournament.responses.ResponseMessage;
import kz.hackaton.tournament.services.TournamentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;

@RestController
@RequestMapping("/tournament")
@RequiredArgsConstructor
public class TournamentController {

    private final TournamentService tournamentService;

    @PostMapping("/join")
    public ResponseEntity<ResponseMessage> joinTourney(Principal principal) {
        System.out.println(principal.getName());
        tournamentService.joinTourney(principal.getName());
        return new ResponseEntity<>(ResponseMessage.builder().statusCode(200).message("Succesfully added").build(), HttpStatus.OK);
    }
}
