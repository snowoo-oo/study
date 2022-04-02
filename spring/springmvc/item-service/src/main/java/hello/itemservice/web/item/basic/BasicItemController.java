package hello.itemservice.web.item.basic;

import hello.itemservice.domain.item.Item;
import hello.itemservice.domain.item.ItemRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import javax.annotation.PostConstruct;
import java.util.List;

@Controller
@RequestMapping("/basic/items")
@RequiredArgsConstructor
public class BasicItemController {

    private final ItemRepository itemRepository;

    /**
     * @AutoWired
     * public BasicItemController(ItemRepository itemRepository){
     *     this.itemRepository = itemRepository;
     * }
     */

    @GetMapping
    public String items(Model model){

        List<Item> items = itemRepository.findAll();
        model.addAttribute("items", items);

        return "basic/items";
    }

    @PostConstruct
    public void init(){

        itemRepository.save(new Item("ItemA", 1000, 10));
        itemRepository.save(new Item("ItemB", 2000, 20));

    }

    @GetMapping("/{itemId}")
    public String item(@PathVariable Long itemId, Model model){

        Item findItem = itemRepository.findById(itemId);
        model.addAttribute("item", findItem);

        return "basic/item";
    }

    @GetMapping("/add")
    public String addItem(){
        return "basic/addForm";
    }

    //@PostMapping("/add")
    public String saveItemV1(@RequestParam String itemName,
                           @RequestParam int price,
                           @RequestParam Integer quantity,
                           Model model){
        Item item = new Item(itemName, price, quantity);
        Item savedItem = itemRepository.save(item);

        model.addAttribute("item", savedItem);

        return "basic/item";
    }

    //@PostMapping("/add")
    public String saveItemV2(@ModelAttribute("item") Item item){
        itemRepository.save(item);

        return "basic/item";
    }

    //@PostMapping("/add")
    public String saveItemV3(@ModelAttribute Item item){
        itemRepository.save(item);

        return "basic/item";
    }

    //@PostMapping("/add")
    public String saveItemV4(Item item){
        itemRepository.save(item);

        return "basic/item";
    }

    //@PostMapping("/add")
    public String saveItemV5(Item item){
        itemRepository.save(item);

        return "redirect:/basic/items/" + item.getId();
    }

    @PostMapping("/add")
    public String saveItemV6(Item item, RedirectAttributes redirectAttributes){
        Item savedItem = itemRepository.save(item);
        redirectAttributes.addAttribute("itemId", savedItem.getId());
        redirectAttributes.addAttribute("status", true);

        return "redirect:/basic/items/{itemId}";
    };
    }

    @GetMapping("/{itemId}/edit")
    public String editForm(@PathVariable Long itemId, Model model){
        Item findItem = itemRepository.findById(itemId);
        model.addAttribute("item", findItem);

        return "basic/editForm";
    }

    @PostMapping("/{itemId}/edit")
    public String edit(@PathVariable Long itemId, @ModelAttribute Item item){
        itemRepository.update(itemId, item);

        return "redirect:/basic/items/{itemId}";
    }
}
