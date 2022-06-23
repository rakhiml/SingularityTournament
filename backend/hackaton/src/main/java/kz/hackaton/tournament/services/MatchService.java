package kz.hackaton.tournament.services;

import kz.hackaton.tournament.entities.Match;
import kz.hackaton.tournament.repositories.MatchRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class MatchService {
    private final MatchRepository matchRepository;

    public void save(Match match) {
        matchRepository.save(match);
    }
}
