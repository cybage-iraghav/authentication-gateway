<div id="paginationContainer">
    <nav aria-label="Page navigation example">
        <ul class="pagination justify-content-end">
            <?php $href = request()->has('reseller') ? '&reseller=' . urlencode(request()->get('reseller')) : ''; ?>
            <li class="page-item  {{$currentPage==1 ? 'disabled' : '' }}">
                <a class="page-link" href="?page={{ $currentPage-1}}{{$href}}">{{ __('Previous') }}</a>
            </li>
            @for($page=1; $page <= $totalPages; $page++) <li class="page-item {{ ($currentPage == $page) ? 'active' : '' }}">
                <a class="page-link" href="?page={{ $page }}{{$href}}">{{ $page }}</a>
                </li>
                @endfor
                <li class="page-item {{$currentPage==$totalPages ? 'disabled' : '' }}">
                    <a class="page-link" href="?page={{ $currentPage+1 }}{{$href}}">{{ __('Next') }}</a>
                </li>
        </ul>
    </nav>
</div>