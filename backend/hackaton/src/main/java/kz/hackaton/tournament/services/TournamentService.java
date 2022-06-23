package kz.hackaton.tournament.services;

import kz.hackaton.tournament.dto.*;
import kz.hackaton.tournament.entities.Match;
import kz.hackaton.tournament.entities.Round;
import kz.hackaton.tournament.entities.Tournament;
import kz.hackaton.tournament.entities.User;
import kz.hackaton.tournament.exceptions.TournamentException;
import kz.hackaton.tournament.repositories.TournamentRepositories;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.PathVariable;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class TournamentService {

    private final TournamentRepositories tournamentRepositories;
    private final UserService userService;
    private final RoundService roundService;

    private final MatchService matchService;

    @Transactional
    public void joinTourney(String name, Long id) {
        Tournament tournament = tournamentRepositories.findById(id).orElseThrow(() -> new RuntimeException("a"));

        User user = userService.findUserByLogin(name);
        if(tournament.getUsers().contains(user)) {
            throw new TournamentException("You're already participant");
        }
        tournament.getUsers().add(user);
       // user.getTournaments().add(tournament);



    }

    @Transactional
    public void registerTourney(CreateTournamentDto createTournamentDto, String name) {
        List<Tournament> tournaments = tournamentRepositories.findAll();

        for (Tournament x : tournaments) {
            if (x.getType().equals(createTournamentDto.getType()))
                throw new TournamentException("Tournament " + createTournamentDto.getType() + " already exists");
        }
//        if(tournaments != null) {
//            throw new TournamentException("Tournament " + createTournamentDto.getType() + " already exists");
//        }
        Tournament tournament = new Tournament();
        tournament.setName(createTournamentDto.getName());
        tournament.setType(createTournamentDto.getType());
        tournament.setCreatedDate(LocalDate.now());
        tournament.setStatus("registration");
        tournament.setDescription(createTournamentDto.getDescription());
        User owner = userService.findUserByLogin(name);
        tournament.setOwner(owner.getId());
        tournamentRepositories.save(tournament);
    }

    @Transactional
    public void startTourney(Long id, String login) {
        User userByLogin = userService.findUserByLogin(login);
        if(!userByLogin.getLogin().equals(login)) {
            System.out.println("ERORRRRRR");
            return;
        }

        Tournament tournament = tournamentRepositories.findById(id).orElseThrow(() -> new RuntimeException("EROR"));
        Collection<User> users = tournament.getUsers();
        int usersCount = users.size() - 1;
        int days = (usersCount / 5) * 2 + usersCount;
        tournament.setStatus("started");
        tournament.setStartedDate(LocalDate.now());
        tournament.setFinishedDate(tournament.getStartedDate().plusDays(days));

        List<Round> roundList = generateRound(tournament);

        tournament.setRoundList(roundList);

    }

    @Transactional
    public void winnerResult(WinnerResult winnerResult, String name) {

        Long authId = userService.findUserByLogin(name).getId();
        Tournament tournament = tournamentRepositories.findById(winnerResult.getTournamentId()).get();
        LocalDate startedDate = tournament.getStartedDate();
        LocalDate now = LocalDate.now();
        if(ChronoUnit.DAYS.between(now,startedDate)+1 != winnerResult.getStage()) {
            throw new TournamentException("You cannot change past/future details \n" +
                    "Days between : " + ChronoUnit.DAYS.between(now,startedDate) + "\n" +
                    "Stage : " + winnerResult.getStage());
        }
        List<Match> matchList = tournament.getRoundList().get(winnerResult.getStage() - 1).getMatchList();
        User userByLogin = userService.findUserByLogin(winnerResult.getWinnerLogin());

        for(Match m : matchList) {
            if(m.getUser1().equals(userByLogin.getId()) || m.getUser2().equals(userByLogin.getId())) {
                if(m.getUser1().equals(authId) || m.getUser2().equals(authId)) {
                    if(m.getWinner() != null) {
                        throw new TournamentException("Winner already exists");
                    }
                    m.setWinner(userByLogin.getId());
                    return;
                }
            }
        }
        throw new TournamentException("Error, Invalid data!");

    }

    public TournamentBracketDto getDetailsTournamentBracket(Long id) {
        Tournament tournament = tournamentRepositories.findById(id).get();
        TournamentBracketDto tournamentBracketDto = new TournamentBracketDto(tournament.getId(), tournament.getName(), tournament.getType(), tournament.getDescription());

        tournamentBracketDto.setRoundList(tournament.getRoundList());
        return tournamentBracketDto;
    }

    public TournamentFullDetailsDto getDetailsTournament(Long id) {
        Tournament tournament = tournamentRepositories.findById(id).get();
        TournamentFullDetailsDto tournamentFullDetailsDto = new TournamentFullDetailsDto(tournament.getId(), tournament.getName(),
                tournament.getType(), tournament.getDescription());
        List<User> users = (List<User>) tournament.getUsers();
        List<UserDto> collect = users.stream().map((u) -> new UserDto(u.getLogin(), u.getName(), u.getSurname(), u.getMajor())).collect(Collectors.toList());
        tournamentFullDetailsDto.setList(collect);
        return tournamentFullDetailsDto;

    }

    public List<RegisterTourneyDto> getRegisterTournaments(String status) {

        List<Tournament> tournaments = tournamentRepositories.findByStatus(status);
        if(status.equals("started")) {

        }
        List<RegisterTourneyDto> list = new ArrayList<>();
        for(Tournament t : tournaments) {
            RegisterTourneyDto registerTourneyDto = new RegisterTourneyDto();
            registerTourneyDto.setId(t.getId());
            registerTourneyDto.setName(t.getName());
            registerTourneyDto.setType(t.getType());
            registerTourneyDto.setParticipants(t.getUsers().size());
            registerTourneyDto.setDescription(t.getDescription());
            list.add(registerTourneyDto);
        }
        return list;
    }



    public List<Round> generateRound(Tournament tournament) {
        List<User> users = (List<User>) tournament.getUsers();
        Collections.shuffle(users);
        List<Round> roundList = new ArrayList<>();
        for (int i = 0; i < users.size() - 1; i++) {
             Round round = new Round();
             round.setStage(i+1);
            List<Match> matchList = new ArrayList<>();
            for (int j = 0; j < users.size()/2; j++) {
                Match match = new Match();
                match.setUser1(users.get(j).getId());
                match.setUser2(users.get(j+users.size()/2).getId());
                matchService.save(match);
                matchList.add(match);

            }

            round.setMatchList(matchList);
            roundService.save(round);
            roundList.add(round);

            shuffleAlg(users);
        }
        return roundList;
    }


    public List<User> shuffleAlg(List<User> list) {
        User temp = list.get(list.size()-1);
        for (int i = list.size()-1; i > 0; i--) {
            if(i == 1) {
                list.set(i,temp);
                break;
            }
            list.set(i,list.get(i-1));
        }
        return list;
    }
}
