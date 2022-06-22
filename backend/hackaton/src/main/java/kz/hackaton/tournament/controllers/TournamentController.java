package kz.hackaton.tournament.controllers;

import kz.hackaton.tournament.dto.CreateTournamentDto;
import kz.hackaton.tournament.responses.ResponseMessage;
import kz.hackaton.tournament.services.TournamentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;

@RestController
@RequestMapping("/tournament")
@RequiredArgsConstructor
public class TournamentController {

    private final TournamentService tournamentService;

    @PostMapping("/join/{tour_id}")
    public ResponseEntity<ResponseMessage> joinTourney(Principal principal,@PathVariable(name = "tour_id") Long id) {
        tournamentService.joinTourney(principal.getName(), id);
        return new ResponseEntity<>(ResponseMessage.builder().statusCode(200).message("Succesfully added").build(), HttpStatus.OK);
    }

    @PostMapping("/create")
    public ResponseEntity<ResponseMessage> createTourney(@RequestBody CreateTournamentDto createTournamentDto, Principal principal) {

        tournamentService.registerTourney(createTournamentDto);
        return new ResponseEntity<>(ResponseMessage.builder().statusCode(200).message("Succesfully added").build(), HttpStatus.OK);
    }
}
